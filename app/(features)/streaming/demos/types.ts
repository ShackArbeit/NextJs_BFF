export type DemoKey =
  | 'auto-prerender'
  | 'suspense-stream'
  | 'use-cache'
  | 'runtime-cookies'
  | 'tags-revalidate'

export type DemoItem = {
  key: DemoKey
  title: string
  description: string
  Component: (props: { tab: DemoKey }) => Promise<React.ReactElement> | React.ReactElement
}

export type DemoMeta = Omit<DemoItem, 'Component'>
