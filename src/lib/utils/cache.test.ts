import { describe, it, expect, beforeEach } from 'vitest';

class MemoryCache<T> {
	private cache = new Map<string, { data: T; timestamp: number; ttl: number }>();
	private defaultTTL: number;

	constructor(defaultTTL: number = 5 * 60 * 1000) {
		this.defaultTTL = defaultTTL;
	}

	set(key: string, data: T, ttl?: number): void {
		this.cache.set(key, {
			data,
			timestamp: Date.now(),
			ttl: ttl ?? this.defaultTTL
		});
	}

	get(key: string): T | null {
		const entry = this.cache.get(key);
		if (!entry) return null;

		if (Date.now() - entry.timestamp > entry.ttl) {
			this.cache.delete(key);
			return null;
		}

		return entry.data;
	}

	has(key: string): boolean {
		const entry = this.cache.get(key);
		if (!entry) return false;

		if (Date.now() - entry.timestamp > entry.ttl) {
			this.cache.delete(key);
			return false;
		}

		return true;
	}

	invalidate(pattern?: string): void {
		if (!pattern) {
			this.cache.clear();
			return;
		}

		for (const key of this.cache.keys()) {
			if (key.includes(pattern)) {
				this.cache.delete(key);
			}
		}
	}
}

describe('MemoryCache', () => {
	let cache: MemoryCache<string>;

	beforeEach(() => {
		cache = new MemoryCache<string>(1000);
	});

	it('should store and retrieve data', () => {
		cache.set('key1', 'value1');
		expect(cache.get('key1')).toBe('value1');
	});

	it('should return null for expired entries', async () => {
		const fastCache = new MemoryCache<string>(50);
		fastCache.set('key1', 'value1');
		
		await new Promise(resolve => setTimeout(resolve, 100));
		
		expect(fastCache.get('key1')).toBe(null);
	});

	it('should check if key exists', () => {
		cache.set('key1', 'value1');
		expect(cache.has('key1')).toBe(true);
		expect(cache.has('key2')).toBe(false);
	});

	it('should invalidate by pattern', () => {
		cache.set('user_1', 'user1');
		cache.set('user_2', 'user2');
		cache.set('post_1', 'post1');

		cache.invalidate('user_');
		
		expect(cache.get('user_1')).toBe(null);
		expect(cache.get('user_2')).toBe(null);
		expect(cache.get('post_1')).toBe('post1');
	});

	it('should clear all entries', () => {
		cache.set('key1', 'value1');
		cache.set('key2', 'value2');
		
		cache.invalidate();
		
		expect(cache.get('key1')).toBe(null);
		expect(cache.get('key2')).toBe(null);
	});
});