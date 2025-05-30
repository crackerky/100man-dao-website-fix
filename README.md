# 100man DAO Website - 完全版

このリポジトリは、crackerky/100man-dao-websiteのNetlifyビルドエラーを修正し、美しいBackgroundAnimationコンポーネントを追加した完全版です。

## 🆕 NEW: BackgroundAnimation コンポーネント

美しい幾何学的アニメーション背景コンポーネントを追加しました。分散した線が集まって一つの円を形成し、水滴波紋効果で無限に広がる詩的な視覚体験を提供します。

### ✨ BackgroundAnimation の特徴

- **スクロール連動**: ページスクロールに応じてアニメーションが進行
- **4段階の変容**: 
  1. 散乱した線分
  2. 中央への収束
  3. 完璧な円の形成  
  4. 水滴波紋効果
- **背景最適化**: コンテンツの視認性を保つ低透明度
- **レスポンシブ**: 画面サイズに自動対応
- **高パフォーマンス**: 軽量で滑らかな動作

### 🎯 使用方法

```tsx
import { BackgroundAnimation } from '@/components'

// 基本的な使用
function App() {
  return (
    <div className="relative min-h-screen bg-slate-950">
      {/* 背景アニメーション */}
      <BackgroundAnimation opacity={0.3} />
      
      {/* メインコンテンツ */}
      <div className="relative z-10">
        <h1>Your Content Here</h1>
        {/* 既存のコンテンツ */}
      </div>
    </div>
  )
}

// または既製のテンプレートを使用
import { DemoPageTemplate } from '@/components'

function HomePage() {
  return (
    <DemoPageTemplate 
      title="100 Man DAO"
      subtitle="Unity from Diversity"
      backgroundOpacity={0.4}
    />
  )
}
```

### 🎛️ Props

```tsx
interface BackgroundAnimationProps {
  className?: string    // 追加CSSクラス
  opacity?: number     // 全体の透明度 (0-1, デフォルト: 0.4)
  autoPlay?: boolean   // 自動再生モード (将来拡張用)
}
```

### 💡 デザイン哲学

このアニメーションは100 Man DAOのビジョンを視覚的に表現しています：

- **Unity from Diversity**: 散らばった個々の要素が統一された全体を形成
- **Collective Harmony**: 異なる部分が協力して美しいパターンを創造
- **Infinite Possibility**: 波紋効果が無限の可能性を象徴

## 🚀 プロジェクト構造

```
100man-dao-website/
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── layout.tsx               # ルートレイアウト
│   │   └── page.tsx                 # ホームページ
│   ├── components/
│   │   ├── atoms/
│   │   │   ├── BackgroundAnimation.tsx  # 🆕 背景アニメーション
│   │   │   └── Typography.tsx           # 修正済みタイポグラフィ
│   │   ├── templates/
│   │   │   └── DemoPageTemplate.tsx     # 🆕 完全なデモページ
│   │   └── index.ts                     # エクスポートファイル
│   ├── lib/
│   │   └── utils.ts                     # ユーティリティ関数
│   └── styles/
│       └── globals.css                  # 🆕 グローバルスタイル
├── .eslintrc.json                       # 🆕 ESLint設定
├── .gitignore                           # 🆕 Git除外設定
├── next.config.js                       # 🆕 Next.js設定
├── next-env.d.ts                        # 🆕 TypeScript環境定義
├── postcss.config.js                    # 🆕 PostCSS設定
├── tailwind.config.ts                   # 🆕 Tailwind CSS設定
├── tsconfig.json                        # 🆕 TypeScript設定
├── package.json                         # 依存関係
└── README.md                            # このファイル
```

## 🛠️ セットアップ

### 1. 依存関係のインストール

```bash
npm install
# または
yarn install
# または
pnpm install
```

### 2. 開発サーバーの起動

```bash
npm run dev
# または
yarn dev
# または
pnpm dev
```

### 3. ビルド

```bash
npm run build
# または
yarn build
# または
pnpm build
```

### 4. 本番サーバーの起動

```bash
npm start
# または
yarn start
# または
pnpm start
```

## 🐛 修正された問題 (Typography)

Netlifyでのビルド時に発生していたTypeScriptエラーを修正：

```
Type error: Property 'large' does not exist on type 'JSX.IntrinsicElements'.
```

### 修正内容

明示的な要素マッピングの導入により型安全性を向上：

```typescript
const variantElementMap = {
  h1: 'h1', h2: 'h2', h3: 'h3', h4: 'h4', h5: 'h5', h6: 'h6',
  p: 'p', lead: 'p', large: 'p', small: 'span', muted: 'p',
} as const

const Component = as || (variant ? variantElementMap[variant] : 'p')
```

## 🎨 スタイリング

- **Tailwind CSS**: ユーティリティファーストのCSS framework
- **shadcn/ui**: 美しいコンポーネントライブラリ
- **Framer Motion**: 滑らかなアニメーション
- **Custom CSS Variables**: ダークモード対応

## 📝 技術スタック

- **Next.js 14**: React framework with App Router
- **TypeScript 5**: 型安全な開発
- **Tailwind CSS 3**: スタイリング
- **Framer Motion**: アニメーション
- **Radix UI**: アクセシブルなUI primitives
- **ESLint**: コード品質管理

## 🌟 特徴

- ✅ **TypeScript完全対応**: 型安全性保証
- ✅ **レスポンシブデザイン**: 全デバイス対応
- ✅ **ダークモード**: 美しいダークテーマ
- ✅ **SEO最適化**: メタデータとOGタグ完備
- ✅ **パフォーマンス最適化**: Next.js最適化機能
- ✅ **アクセシビリティ**: Radix UIによる高いアクセシビリティ
- ✅ **アニメーション**: Framer Motionによる滑らかな動作

## 🚀 デプロイ

### Vercel (推奨)

```bash
npm install -g vercel
vercel
```

### Netlify

1. `npm run build`でビルド
2. `out/`フォルダをNetlifyにデプロイ

### その他のプラットフォーム

Next.jsの静的エクスポート機能を使用して、任意のホスティングプロバイダーにデプロイ可能です。

## 📄 ライセンス

このプロジェクトは、100 Man DAOの規約に基づいています。

---

*Unity from Diversity - 多様性から生まれる統一の美学を、技術で表現する。*
