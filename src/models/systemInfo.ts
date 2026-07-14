interface ClientContext {
  userAgent: string;
  platform: string;
  language: string;
  timezone: string;
  screen: { width: number; height: number; pixelRatio: number };
  online: boolean;
  connection?: { effectiveType: string; downlink: number };
  cores?: number;
  memory?: number;
}

class ClientContextService {
  private static instance: ClientContextService;

  private constructor() {}

  static getInstance(): ClientContextService {
    if (!ClientContextService.instance) {
      ClientContextService.instance = new ClientContextService();
    }
    return ClientContextService.instance;
  }

  get(): ClientContext {
    const nav = navigator as Navigator & {
      connection?: { effectiveType: string; downlink: number };
      deviceMemory?: number;
    };

    return {
      userAgent: nav.userAgent,
      platform: nav.platform,
      language: nav.language,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      screen: {
        width: window.screen.width,
        height: window.screen.height,
        pixelRatio: window.devicePixelRatio,
      },
      online: nav.onLine,
      connection: nav.connection
        ? {
            effectiveType: nav.connection.effectiveType,
            downlink: nav.connection.downlink,
          }
        : undefined,
      cores: nav.hardwareConcurrency,
      memory: nav.deviceMemory,
    };
  }
}

export const clientContext = ClientContextService.getInstance();
