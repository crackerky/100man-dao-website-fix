# 100man DAO Website - TypeScript エラー修正版

このリポジトリは、crackerky/100man-dao-websiteのNetlifyビルドエラーを修正したバージョンです。

## 🆕 NEW: BackgroundAnimation コンポーネント追加

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
import BackgroundAnimation from '@/components/atoms/BackgroundAnimation'

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

---

## 🐛 発生していた問題 (Typography修正)

Netlifyでのビルド時に以下のTypeScriptエラーが発生していました：

```
Type error: Property 'large' does not exist on type 'JSX.IntrinsicElements'.
```

エラーの発生場所：`src/components/atoms/Typography.tsx:46:7`

## 🔍 問題の原因

元のコードでは以下のロジックで HTML 要素を決定していました：

```typescript
const Component = as || (variant?.startsWith('h') ? variant : 'p')
```

この方法の問題点：
1. `variant` が \"large\" の場合、`startsWith('h')` は `false` を返すため、`Component` は 'p' になるべき
2. しかし、TypeScript は `Component` が \"large\" という文字列になる可能性があると推論
3. \"large\" は有効な JSX 要素名ではないため、型エラーが発生

## ✅ 修正内容

### 1. 明示的な要素マッピングの導入

```typescript
// Map variants to their corresponding HTML elements
const variantElementMap = {
  h1: 'h1',
  h2: 'h2', 
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
  p: 'p',
  lead: 'p',
  large: 'p',      // 明示的に 'p' 要素にマッピング
  small: 'span',
  muted: 'p',
} as const
```

### 2. 安全な要素選択ロジック

```typescript
// Use the explicit 'as' prop, or fall back to the mapped element for the variant
const Component = as || (variant ? variantElementMap[variant] : 'p')
```

## 🎯 修正の利点

1. **型安全性の向上**: TypeScript が正確に型を推論できる
2. **明示的なマッピング**: 各 variant がどの HTML 要素に対応するかが明確
3. **保守性の向上**: 新しい variant を追加する際も、明示的にマッピングを定義する必要がある
4. **バグの回避**: 無効な HTML 要素名が使用されることがない

## 🚀 Typography使用方法

修正されたコンポーネントは元のAPIと完全に互換性があります：

```tsx
// 基本的な使用
<Typography variant="large">Large text</Typography>

// カスタム要素の指定
<Typography variant="large" as="div">Large text in div</Typography>

// グラデーションとアニメーション
<Typography 
  variant="h1" 
  gradient 
  isAnimated 
  animationDelay={0.2}
>
  Animated heading
</Typography>
```

## 📁 ファイル構造

```
100man-dao-website/
├── src/
│   ├── components/
│   │   └── atoms/
│   │       ├── Typography.tsx           # 修正されたファイル
│   │       └── BackgroundAnimation.tsx  # 新規追加
│   └── lib/
│       └── utils.ts
├── package.json
└── README.md
```

## 🔧 ビルド確認

修正後、以下のコマンドでビルドが成功することを確認できます：

```bash
npm install
npm run build
```

## 📝 技術スタック

- Next.js 14.0.4
- TypeScript 5.x
- Framer Motion (アニメーション)
- Tailwind CSS (スタイリング)
- Radix UI (コンポーネント)

---

*この修正とコンポーネント追加により、型安全性と美しい視覚体験の両方を実現しています。*
