/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

class AnalyticsService {
  /**
   * Track custom events on the menu.
   */
  public trackEvent(eventName: string, params: Record<string, any> = {}): void {
    const logPrefix = "%c[Analytics]";
    const style = "color: #C5A059; font-weight: bold;";
    
    // In production, this can push to Plausible, Google Analytics, or a Supabase logger
    console.log(
      `${logPrefix} Tracked: ${eventName}`,
      style,
      {
        ...params,
        timestamp: new Date().toISOString(),
        url: window.location.href,
        screenSize: `${window.innerWidth}x${window.innerHeight}`,
      }
    );
  }

  public trackPageView(pageName: string): void {
    this.trackEvent("page_view", { pageName });
  }

  public trackCategoryClick(categoryId: string, categoryTitle: string): void {
    this.trackEvent("category_click", { categoryId, categoryTitle });
  }

  public trackProductDetails(productId: string, productName: string): void {
    this.trackEvent("product_view", { productId, productName });
  }

  public trackLanguageSwitch(from: string, to: string): void {
    this.trackEvent("language_switch", { from, to });
  }

  public trackInteractiveClick(action: string): void {
    this.trackEvent("interactive_click", { action });
  }
}

export const analyticsService = new AnalyticsService();
