export interface CacheEntry<T> {
	data: T;
	timestamp: number;
	ttl: number;
}

export class MemoryCache<T> {
	private cache = new Map<string, CacheEntry<T>>();
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

	keys(): string[] {
		return Array.from(this.cache.keys());
	}

	size(): number {
		return this.cache.size;
	}
}

export const metricCache = new MemoryCache<any>(5 * 60 * 1000);
export const keywordsCache = new MemoryCache<any>(3 * 60 * 1000);
export const backlinksCache = new MemoryCache<any>(3 * 60 * 1000);