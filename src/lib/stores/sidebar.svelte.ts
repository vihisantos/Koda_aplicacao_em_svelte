class SidebarStore {
	isMobileMenuOpen = $state(false);
	windowWidth = $state(typeof window !== 'undefined' ? window.innerWidth : 1024);

	get isMobile(): boolean {
		return this.windowWidth < 768;
	}

	get isTablet(): boolean {
		return this.windowWidth >= 768 && this.windowWidth < 1024;
	}

	get mainPaddingClass(): string {
		if (this.isMobile) return '';
		if (this.isTablet) return 'ml-16';
		return 'ml-64';
	}

	get sidebarWidthClass(): string {
		if (this.isMobile) return 'w-64';
		if (this.isTablet) return 'w-16';
		return 'w-64';
	}

	toggleMobileMenu(): void {
		this.isMobileMenuOpen = !this.isMobileMenuOpen;
	}

	closeMobileMenu(): void {
		this.isMobileMenuOpen = false;
	}

	updateWindowWidth(width: number): void {
		this.windowWidth = width;
		if (!this.isMobile) {
			this.isMobileMenuOpen = false;
		}
	}
}

export const sidebarStore = new SidebarStore();
