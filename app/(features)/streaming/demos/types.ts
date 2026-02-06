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
  // 使用 React.ReactElement 或 React.ReactNode 更加穩定
  Component: (props: { tab: DemoKey }) => Promise<React.ReactElement> | React.ReactElement
}