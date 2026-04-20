export interface RankingAlert {
	id: string;
	keyword: string;
	previousPosition: number;
	currentPosition: number;
	change: 'up' | 'down' | 'stable';
	date: Date;
	viewed: boolean;
}

class AlertsStore {
	alerts = $state<RankingAlert[]>([]);
	threshold = $state(5);

	checkForAlerts(keywords: Array<{ keyword: string; position: number }>, previousData: Map<string, number>): void {
		const newAlerts: RankingAlert[] = [];

		for (const kw of keywords) {
			const prevPosition = previousData.get(kw.keyword);
			if (prevPosition === undefined) continue;

			const diff = prevPosition - kw.position;

			if (Math.abs(diff) >= this.threshold) {
				newAlerts.push({
					id: crypto.randomUUID(),
					keyword: kw.keyword,
					previousPosition: prevPosition,
					currentPosition: kw.position,
					change: diff > 0 ? 'up' : 'down',
					date: new Date(),
					viewed: false
				});
			}
		}

		this.alerts = [...newAlerts, ...this.alerts].slice(0, 50);
	}

	markAsViewed(id: string): void {
		this.alerts = this.alerts.map(a => a.id === id ? { ...a, viewed: true } : a);
	}

	markAllAsViewed(): void {
		this.alerts = this.alerts.map(a => ({ ...a, viewed: true }));
	}

	clearAlerts(): void {
		this.alerts = [];
	}

	get unreadCount(): number {
		return this.alerts.filter(a => !a.viewed).length;
	}
}

export const alertsStore = new AlertsStore();