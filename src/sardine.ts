interface SardineOptions {
  url: string
  defaultFakeConfigs?: Record<string, any>
  // TODO: nock config
}
export class Sardine {
  constructor(options: SardineOptions) {}
}
