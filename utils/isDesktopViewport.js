export function isDesktopViewport(page) {
    const size = page.viewportSize();
    return size.width >= 600;
  }