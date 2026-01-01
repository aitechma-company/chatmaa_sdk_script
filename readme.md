# ChatMAA Widget Integration Guide

Add the ChatMAA AI Chat Assistant to your website with just a few lines of code. The widget creates a floating chat button that opens a full-featured chat interface in an iframe.

**Get started:** Create your account at [www.chatmaa.com](https://www.chatmaa.com) to get your ChatMAA instance URL.

## Quick Start

The ChatMAA widget is hosted on our CDN. Simply add the configuration and script to your HTML:

```html
<!DOCTYPE html>
<html>
<head>
    <title>My Website</title>
</head>
<body>
    <!-- Your website content -->
    
    <!-- ChatMAA Configuration -->
    <script>
        window.ChatMAAConfig = {
            baseUrl: "https://your-instance.chatmaa.com"  // Your ChatMAA instance URL
        };
    </script>
    
    <!-- ChatMAA Widget Script -->
    <script src="https://cdn.chatmaa.com/js/script.js"></script>
</body>
</html>
```

That's it! The chat button will appear in the bottom-right corner of your page.

## Configuration Options

Configure the widget by setting `window.ChatMAAConfig` before loading the script:

```javascript
window.ChatMAAConfig = {
    // Required: Your ChatMAA instance URL (from www.chatmaa.com)
    baseUrl: "https://your-instance.chatmaa.com",
    
    // Optional: User email (for personalized experience)
    email: "user@example.com",
    
    // Optional: User name (for personalized experience)
    name: "John Doe",
    
    // Optional: Launcher button position
    // Options: "bottom-right" (default), "bottom-left", "top-right", "top-left"
    position: "bottom-right",
    
    // Optional: Launcher button color (hex color)
    primaryColor: "#2563eb",
    
    // Optional: Launcher button icon (emoji or HTML)
    launcherIcon: "💬",
    
    // Optional: Widget dimensions (desktop only)
    width: 360,      // Widget width in pixels
    height: 500,     // Widget height in pixels
    
    // Optional: z-index for the widget
    zIndex: 9999
};
```

## Integration Guides

### Vanilla JavaScript / HTML

For any standard HTML website, add the script before the closing `</body>` tag:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Website</title>
</head>
<body>
    <h1>Welcome to My Website</h1>
    
    <!-- ChatMAA Configuration -->
<script>
    window.ChatMAAConfig = {
            baseUrl: "https://your-instance.chatmaa.com",
            email: "user@example.com",  // Optional
            name: "John Doe"            // Optional
    };
</script>
    
    <!-- ChatMAA Widget -->
    <script src="https://cdn.chatmaa.com/js/script.js"></script>
</body>
</html>
```

### Next.js App Router (Next.js 13+)

For Next.js 13+ with the App Router, add the configuration and script in your root layout:

**`app/layout.tsx`:**

```typescript
import type { Metadata } from 'next'
import Script from 'next/script'

export const metadata: Metadata = {
  title: 'My App',
  description: 'My App Description',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        {children}
        
        {/* ChatMAA Configuration */}
        <Script id="chatmaa-config" strategy="beforeInteractive">
          {`
            window.ChatMAAConfig = {
              baseUrl: "${process.env.NEXT_PUBLIC_CHATMAA_BASE_URL || 'https://your-instance.chatmaa.com'}",
              ${process.env.NEXT_PUBLIC_CHATMAA_EMAIL ? `email: "${process.env.NEXT_PUBLIC_CHATMAA_EMAIL}",` : ''}
              ${process.env.NEXT_PUBLIC_CHATMAA_NAME ? `name: "${process.env.NEXT_PUBLIC_CHATMAA_NAME}",` : ''}
              position: "${process.env.NEXT_PUBLIC_CHATMAA_POSITION || 'bottom-right'}",
              primaryColor: "${process.env.NEXT_PUBLIC_CHATMAA_PRIMARY_COLOR || '#2563eb'}",
            };
          `}
        </Script>
        
        {/* ChatMAA Widget */}
        <Script 
          src="https://cdn.chatmaa.com/js/script.js" 
          strategy="afterInteractive"
        />
      </body>
    </html>
  )
}
```

**Environment Variables (`.env.local`):**

```env
NEXT_PUBLIC_CHATMAA_BASE_URL=https://your-instance.chatmaa.com
NEXT_PUBLIC_CHATMAA_EMAIL=user@example.com
NEXT_PUBLIC_CHATMAA_NAME=John Doe
NEXT_PUBLIC_CHATMAA_POSITION=bottom-right
NEXT_PUBLIC_CHATMAA_PRIMARY_COLOR=#2563eb
```

**`app/layout.js` (JavaScript version):**

```javascript
import Script from 'next/script'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Script id="chatmaa-config" strategy="beforeInteractive">
          {`
            window.ChatMAAConfig = {
              baseUrl: "${process.env.NEXT_PUBLIC_CHATMAA_BASE_URL || 'https://your-instance.chatmaa.com'}",
              ${process.env.NEXT_PUBLIC_CHATMAA_EMAIL ? `email: "${process.env.NEXT_PUBLIC_CHATMAA_EMAIL}",` : ''}
              ${process.env.NEXT_PUBLIC_CHATMAA_NAME ? `name: "${process.env.NEXT_PUBLIC_CHATMAA_NAME}",` : ''}
            };
          `}
        </Script>
        <Script 
          src="https://cdn.chatmaa.com/js/script.js" 
          strategy="afterInteractive"
        />
      </body>
    </html>
  )
}
```

### Next.js Page Router

For Next.js with the Pages Router, add the script in your `_app.js` or `_app.tsx`:

**`pages/_app.tsx`:**

```typescript
import type { AppProps } from 'next/app'
import Script from 'next/script'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
        <Script id="chatmaa-config" strategy="beforeInteractive">
          {`
            window.ChatMAAConfig = {
            baseUrl: "${process.env.NEXT_PUBLIC_CHATMAA_BASE_URL || 'https://your-instance.chatmaa.com'}",
            ${process.env.NEXT_PUBLIC_CHATMAA_EMAIL ? `email: "${process.env.NEXT_PUBLIC_CHATMAA_EMAIL}",` : ''}
            ${process.env.NEXT_PUBLIC_CHATMAA_NAME ? `name: "${process.env.NEXT_PUBLIC_CHATMAA_NAME}",` : ''}
            };
          `}
        </Script>
        <Script 
        src="https://cdn.chatmaa.com/js/script.js" 
          strategy="afterInteractive"
        />
      <Component {...pageProps} />
    </>
  )
}
```

**`pages/_app.js` (JavaScript version):**

```javascript
import Script from 'next/script'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Script id="chatmaa-config" strategy="beforeInteractive">
        {`
          window.ChatMAAConfig = {
            baseUrl: "${process.env.NEXT_PUBLIC_CHATMAA_BASE_URL || 'https://your-instance.chatmaa.com'}",
            ${process.env.NEXT_PUBLIC_CHATMAA_EMAIL ? `email: "${process.env.NEXT_PUBLIC_CHATMAA_EMAIL}",` : ''}
            ${process.env.NEXT_PUBLIC_CHATMAA_NAME ? `name: "${process.env.NEXT_PUBLIC_CHATMAA_NAME}",` : ''}
          };
        `}
      </Script>
      <Script 
        src="https://cdn.chatmaa.com/js/script.js" 
        strategy="afterInteractive"
      />
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
```

### React

For React applications, you can use a `useEffect` hook to load the script:

**`components/ChatMAAWidget.tsx`:**

```typescript
import { useEffect } from 'react'

interface ChatMAAConfig {
  baseUrl: string
  email?: string
  name?: string
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left'
  primaryColor?: string
  launcherIcon?: string
  width?: number
  height?: number
  zIndex?: number
}

declare global {
  interface Window {
    ChatMAAConfig?: ChatMAAConfig
    ChatMAA?: {
      open: () => void
      close: () => void
      destroy: () => void
      config: ChatMAAConfig
    }
  }
}

interface ChatMAAWidgetProps {
  baseUrl: string
  email?: string
  name?: string
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left'
  primaryColor?: string
}

export default function ChatMAAWidget({
  baseUrl,
  email,
  name,
  position = 'bottom-right',
  primaryColor = '#2563eb',
}: ChatMAAWidgetProps) {
  useEffect(() => {
    // Set configuration
    window.ChatMAAConfig = {
      baseUrl,
      email,
      name,
      position,
      primaryColor,
    }

    // Load script if not already loaded
    if (!window.ChatMAA) {
    const script = document.createElement('script')
      script.src = 'https://cdn.chatmaa.com/js/script.js'
    script.async = true
    document.body.appendChild(script)

    return () => {
      // Cleanup on unmount
      if (window.ChatMAA) {
        window.ChatMAA.destroy()
      }
        if (script.parentNode) {
          script.parentNode.removeChild(script)
        }
      }
    }
  }, [baseUrl, email, name, position, primaryColor])

  return null
}
```

**Usage in your App:**

```typescript
import ChatMAAWidget from './components/ChatMAAWidget'

function App() {
  return (
    <div>
      <h1>My React App</h1>
      <ChatMAAWidget 
        baseUrl="https://your-instance.chatmaa.com"
        email="user@example.com"
        name="John Doe"
      />
    </div>
  )
}
```

**Or using environment variables:**

```typescript
<ChatMAAWidget 
  baseUrl={process.env.REACT_APP_CHATMAA_BASE_URL || 'https://your-instance.chatmaa.com'}
  email={process.env.REACT_APP_CHATMAA_EMAIL}
  name={process.env.REACT_APP_CHATMAA_NAME}
/>
```

### Angular

For Angular applications, add the script in your `index.html` and configure it in a service:

**`index.html`:**

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>My Angular App</title>
  <base href="/">
  <meta name="viewport" content="width=device-width, initial-scale=1">
</head>
<body>
  <app-root></app-root>
  
  <!-- ChatMAA Configuration -->
  <script>
          window.ChatMAAConfig = {
      baseUrl: 'https://your-instance.chatmaa.com'
    };
  </script>
  
  <!-- ChatMAA Widget -->
  <script src="https://cdn.chatmaa.com/js/script.js"></script>
</body>
</html>
```

**Or use a service for dynamic configuration (`src/app/services/chatmaa.service.ts`):**

```typescript
import { Injectable } from '@angular/core'

declare global {
  interface Window {
    ChatMAAConfig?: {
      baseUrl: string
  email?: string
  name?: string
      position?: string
      primaryColor?: string
    }
    ChatMAA?: {
      open: () => void
      close: () => void
      destroy: () => void
      config: any
    }
  }
}

@Injectable({
  providedIn: 'root'
})
export class ChatMAAService {
  private scriptLoaded = false

  init(baseUrl: string, email?: string, name?: string) {
    window.ChatMAAConfig = {
      baseUrl,
      email,
      name,
    }

    if (!this.scriptLoaded && !window.ChatMAA) {
      const script = document.createElement('script')
      script.src = 'https://cdn.chatmaa.com/js/script.js'
      script.async = true
      document.body.appendChild(script)
      this.scriptLoaded = true
    }
  }

  open() {
    if (window.ChatMAA) {
      window.ChatMAA.open()
    }
  }

  close() {
    if (window.ChatMAA) {
      window.ChatMAA.close()
    }
  }

  destroy() {
    if (window.ChatMAA) {
      window.ChatMAA.destroy()
    }
  }
}
```

**Usage in a component (`src/app/app.component.ts`):**

```typescript
import { Component, OnInit } from '@angular/core'
import { ChatMAAService } from './services/chatmaa.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private chatMAAService: ChatMAAService) {}

  ngOnInit() {
    this.chatMAAService.init(
      'https://your-instance.chatmaa.com',
      'user@example.com',
      'John Doe'
    )
  }
}
```

### Vue.js

For Vue.js applications, create a plugin or component:

**`src/plugins/chatmaa.js`:**

```javascript
export default {
  install(app, options) {
    // Set configuration
    window.ChatMAAConfig = {
      baseUrl: options.baseUrl,
      email: options.email,
      name: options.name,
      position: options.position || 'bottom-right',
      primaryColor: options.primaryColor || '#2563eb',
    }

    // Load script
    if (!window.ChatMAA) {
      const script = document.createElement('script')
      script.src = 'https://cdn.chatmaa.com/js/script.js'
      script.async = true
      document.body.appendChild(script)
    }
  }
}
```

**Usage in `main.js` or `main.ts`:**

```javascript
import { createApp } from 'vue'
import App from './App.vue'
import ChatMAAPlugin from './plugins/chatmaa'

const app = createApp(App)

app.use(ChatMAAPlugin, {
  baseUrl: 'https://your-instance.chatmaa.com',
  email: 'user@example.com',
  name: 'John Doe'
})

app.mount('#app')
```

**Or use a composable (`src/composables/useChatMAA.js`):**

```javascript
import { onMounted, onUnmounted } from 'vue'

export function useChatMAA(config) {
  onMounted(() => {
    window.ChatMAAConfig = {
      baseUrl: config.baseUrl,
      email: config.email,
      name: config.name,
      position: config.position || 'bottom-right',
      primaryColor: config.primaryColor || '#2563eb',
    }

    if (!window.ChatMAA) {
      const script = document.createElement('script')
      script.src = 'https://cdn.chatmaa.com/js/script.js'
      script.async = true
      document.body.appendChild(script)
    }
  })

  onUnmounted(() => {
    if (window.ChatMAA) {
      window.ChatMAA.destroy()
    }
  })
}
```

**Usage in a component:**

```vue
<template>
  <div>
    <h1>My Vue App</h1>
  </div>
</template>

<script setup>
import { useChatMAA } from '@/composables/useChatMAA'

useChatMAA({
  baseUrl: 'https://your-instance.chatmaa.com',
  email: 'user@example.com',
  name: 'John Doe'
})
</script>
```

### WordPress

The easiest way to add ChatMAA to WordPress is using the "Insert Headers and Footers" plugin:

1. Install the **"Insert Headers and Footers"** plugin from the WordPress plugin directory
2. Go to **Settings → Insert Headers and Footers**
3. Paste the following code in the **"Scripts in Footer"** section:

```html
<script>
window.ChatMAAConfig = {
    baseUrl: "https://your-instance.chatmaa.com"
};
</script>
<script src="https://cdn.chatmaa.com/js/script.js"></script>
```

Replace `https://your-instance.chatmaa.com` with your ChatMAA instance URL from [www.chatmaa.com](https://www.chatmaa.com).

## Programmatic Control

After the script loads, you can control the widget programmatically:

```javascript
// Open the chat widget
window.ChatMAA.open()

// Close the chat widget
window.ChatMAA.close()

// Remove the widget completely
window.ChatMAA.destroy()

// Access current configuration
console.log(window.ChatMAA.config)
```

## Dynamic User Information

Update user information dynamically (e.g., after login):

```javascript
// After user logs in
if (window.ChatMAA) {
    window.ChatMAA.config.email = 'newuser@example.com'
    window.ChatMAA.config.name = 'Jane Doe'
} else {
    // If widget hasn't loaded yet
    window.ChatMAAConfig = window.ChatMAAConfig || {}
    window.ChatMAAConfig.email = 'newuser@example.com'
    window.ChatMAAConfig.name = 'Jane Doe'
}
```

## TypeScript Support

For TypeScript projects, add type definitions:

**`types/chatmaa.d.ts`:**

```typescript
interface ChatMAAConfig {
  baseUrl: string
  email?: string
  name?: string
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left'
  primaryColor?: string
  launcherIcon?: string
  width?: number
  height?: number
  zIndex?: number
}

interface ChatMAA {
  open: () => void
  close: () => void
  destroy: () => void
  config: ChatMAAConfig
}

declare global {
  interface Window {
    ChatMAAConfig?: ChatMAAConfig
    ChatMAA?: ChatMAA
  }
}

export {}
```

## Features

- ✅ **Zero dependencies** - Pure vanilla JavaScript
- ✅ **Lightweight** - Minimal footprint
- ✅ **Mobile responsive** - Fullscreen on mobile, floating window on desktop
- ✅ **Auto-restore** - Remembers open/closed state across page reloads
- ✅ **Customizable** - Position, colors, size, and icon
- ✅ **Cross-domain** - Works with any ChatMAA instance
- ✅ **PostMessage API** - Communicate with the widget from your page

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Troubleshooting

### Widget not appearing?

1. **Check configuration**: Ensure `baseUrl` is set correctly (required)
2. **Check console**: Open browser DevTools and look for errors
3. **Script order**: Make sure `window.ChatMAAConfig` is set before loading the script
4. **CDN access**: Verify your site can access `https://cdn.chatmaa.com`

### Widget not loading content?

1. **Verify baseUrl**: Ensure your ChatMAA instance URL is correct
2. **Check CORS**: Verify your ChatMAA server allows iframe embedding
3. **Network tab**: Check browser DevTools Network tab for failed requests

### Styling issues?

1. **z-index conflicts**: Increase `zIndex` in configuration if widget is behind other elements
2. **CSS conflicts**: The widget uses scoped styles, but check for global CSS conflicts
3. **Mobile issues**: Widget automatically goes fullscreen on mobile devices

### Need help?

Visit [www.chatmaa.com](https://www.chatmaa.com) for support and documentation.

## License

[Add your license information here]
