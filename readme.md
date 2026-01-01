# ChatMAA Widget Installation Guide

The ChatMAA widget is a lightweight JavaScript script that adds a chat interface to any website. It creates a floating launcher button and opens a chat widget in an iframe when clicked.

## Installation

### Method 1: Direct Script Include

Add the script to your HTML page before the closing `</body>` tag:

```html
<!DOCTYPE html>
<html>
<head>
    <title>My Website</title>
</head>
<body>
    <!-- Your website content -->
    
    <!-- ChatMAA Widget Script -->
    <script>
        window.ChatMAAConfig = {
            baseUrl: "https://your-domain.com",  // Required: Your ChatMAA instance domain
            email: "user@example.com",             // Optional: User email
            name: "John Doe"                       // Optional: User name
        };
    </script>
    <script src="path/to/script.js"></script>
</body>
</html>
```

### Method 2: CDN (if hosted)

If the script is hosted on a CDN:

```html
<script>
    window.ChatMAAConfig = {
        baseUrl: "https://your-domain.com",
        email: "user@example.com",
        name: "John Doe"
    };
</script>
<script src="https://cdn.example.com/chatmaa-widget.js"></script>
```

### Method 3: NPM Package (if published)

```bash
npm install chatmaa-widget
```

```javascript
import 'chatmaa-widget';
```

## Next.js App Router Installation

For Next.js 13+ App Router, add the Script component directly in your root layout:

**`app/layout.tsx` (TypeScript):**

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
        <Script id="chatmaa-config" strategy="beforeInteractive">
          {`
            window.ChatMAAConfig = {
              baseUrl: "${process.env.NEXT_PUBLIC_CHATMAA_BASE_URL || 'https://your-domain.com'}",
              ${process.env.NEXT_PUBLIC_CHATMAA_EMAIL ? `email: "${process.env.NEXT_PUBLIC_CHATMAA_EMAIL}",` : ''}
              ${process.env.NEXT_PUBLIC_CHATMAA_NAME ? `name: "${process.env.NEXT_PUBLIC_CHATMAA_NAME}",` : ''}
              position: "${process.env.NEXT_PUBLIC_CHATMAA_POSITION || 'bottom-right'}",
              primaryColor: "${process.env.NEXT_PUBLIC_CHATMAA_PRIMARY_COLOR || '#2563eb'}",
              launcherIcon: "${process.env.NEXT_PUBLIC_CHATMAA_LAUNCHER_ICON || '💬'}",
              width: ${process.env.NEXT_PUBLIC_CHATMAA_WIDTH || 360},
              height: ${process.env.NEXT_PUBLIC_CHATMAA_HEIGHT || 500},
              zIndex: ${process.env.NEXT_PUBLIC_CHATMAA_Z_INDEX || 9999}
            };
          `}
        </Script>
        <Script 
          src="/script.js" 
          strategy="afterInteractive"
        />
      </body>
    </html>
  )
}
```

**`app/layout.js` (JavaScript):**

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
              baseUrl: "${process.env.NEXT_PUBLIC_CHATMAA_BASE_URL || 'https://your-domain.com'}",
              ${process.env.NEXT_PUBLIC_CHATMAA_EMAIL ? `email: "${process.env.NEXT_PUBLIC_CHATMAA_EMAIL}",` : ''}
              ${process.env.NEXT_PUBLIC_CHATMAA_NAME ? `name: "${process.env.NEXT_PUBLIC_CHATMAA_NAME}",` : ''}
              position: "${process.env.NEXT_PUBLIC_CHATMAA_POSITION || 'bottom-right'}",
              primaryColor: "${process.env.NEXT_PUBLIC_CHATMAA_PRIMARY_COLOR || '#2563eb'}",
              launcherIcon: "${process.env.NEXT_PUBLIC_CHATMAA_LAUNCHER_ICON || '💬'}",
              width: ${process.env.NEXT_PUBLIC_CHATMAA_WIDTH || 360},
              height: ${process.env.NEXT_PUBLIC_CHATMAA_HEIGHT || 500},
              zIndex: ${process.env.NEXT_PUBLIC_CHATMAA_Z_INDEX || 9999}
            };
          `}
        </Script>
        <Script 
          src="/script.js" 
          strategy="afterInteractive"
        />
      </body>
    </html>
  )
}
```

**Or directly in the config (simpler approach):**

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
        <Script id="chatmaa-config" strategy="beforeInteractive">
          {`
            window.ChatMAAConfig = {
              baseUrl: "https://your-domain.com",
              email: "user@example.com",
              name: "John Doe",
              position: "bottom-left",
              primaryColor: "#10b981",
              launcherIcon: "💬",
              width: 400,
              height: 600,
              zIndex: 10000
            };
          `}
        </Script>
        <Script 
          src="/script.js" 
          strategy="afterInteractive"
        />
      </body>
    </html>
  )
}
```

**Configuration Options:**

All configuration parameters can be set directly in the `window.ChatMAAConfig` object:

- `baseUrl` (required): Your ChatMAA instance domain
- `email` (optional): User email address
- `name` (optional): User name
- `position` (optional): Launcher position - `"bottom-right"`, `"bottom-left"`, `"top-right"`, or `"top-left"` (default: `"bottom-right"`)
- `primaryColor` (optional): Launcher button color in hex format (default: `"#2563eb"`)
- `launcherIcon` (optional): Launcher button icon - emoji or HTML (default: `"💬"`)
- `width` (optional): Widget width in pixels (default: `360`)
- `height` (optional): Widget height in pixels (default: `500`)
- `zIndex` (optional): z-index for the widget (default: `9999`)

**Important:** 
1. Copy `script.js` to your `public` folder so it's accessible at `/script.js`
2. You can use environment variables (as shown in the first example) or set values directly in the config object (as shown in the simpler example)
3. If using environment variables, add them to `.env.local`:
   ```env
   NEXT_PUBLIC_CHATMAA_BASE_URL=https://your-domain.com
   NEXT_PUBLIC_CHATMAA_EMAIL=user@example.com
   NEXT_PUBLIC_CHATMAA_NAME=John Doe
   NEXT_PUBLIC_CHATMAA_POSITION=bottom-left
   NEXT_PUBLIC_CHATMAA_PRIMARY_COLOR=#10b981
   NEXT_PUBLIC_CHATMAA_LAUNCHER_ICON=💬
   NEXT_PUBLIC_CHATMAA_WIDTH=400
   NEXT_PUBLIC_CHATMAA_HEIGHT=600
   NEXT_PUBLIC_CHATMAA_Z_INDEX=10000
   ```

## Next.js Page Router Installation

### Method 1: Using Next.js Script Component in `_app.js` or `_app.tsx`

This is the recommended approach for Next.js page router. Add the script to your `_app.js` or `_app.tsx` file:

**`pages/_app.js` (JavaScript):**

```javascript
import Script from 'next/script'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Script id="chatmaa-config" strategy="beforeInteractive">
        {`
          window.ChatMAAConfig = {
            baseUrl: "https://your-domain.com",
            email: "user@example.com",
            name: "John Doe"
          };
        `}
      </Script>
      <Script 
        src="/path/to/script.js" 
        strategy="afterInteractive"
      />
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
```

**`pages/_app.tsx` (TypeScript):**

```typescript
import type { AppProps } from 'next/app'
import Script from 'next/script'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Script id="chatmaa-config" strategy="beforeInteractive">
        {`
          window.ChatMAAConfig = {
            baseUrl: "https://your-domain.com",
            email: "user@example.com",
            name: "John Doe"
          };
        `}
      </Script>
      <Script 
        src="/path/to/script.js" 
        strategy="afterInteractive"
      />
      <Component {...pageProps} />
    </>
  )
}
```

### Method 2: Using useEffect Hook

If you prefer to load the script conditionally or need more control, use `useEffect`:

**Create a component `components/ChatMAAWidget.tsx`:**

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

export default function ChatMAAWidget() {
  useEffect(() => {
    // Set configuration
    window.ChatMAAConfig = {
      baseUrl: process.env.NEXT_PUBLIC_CHATMAA_BASE_URL || 'https://your-domain.com',
      email: process.env.NEXT_PUBLIC_CHATMAA_EMAIL,
      name: process.env.NEXT_PUBLIC_CHATMAA_NAME,
    }

    // Load script
    const script = document.createElement('script')
    script.src = '/path/to/script.js'
    script.async = true
    document.body.appendChild(script)

    return () => {
      // Cleanup on unmount
      if (window.ChatMAA) {
        window.ChatMAA.destroy()
      }
      document.body.removeChild(script)
    }
  }, [])

  return null
}
```

**Then use it in `pages/_app.tsx`:**

```typescript
import type { AppProps } from 'next/app'
import ChatMAAWidget from '../components/ChatMAAWidget'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <ChatMAAWidget />
      <Component {...pageProps} />
    </>
  )
}
```

### Method 3: Using Environment Variables

Store your configuration in environment variables:

**`.env.local`:**

```env
NEXT_PUBLIC_CHATMAA_BASE_URL=https://your-domain.com
NEXT_PUBLIC_CHATMAA_EMAIL=user@example.com
NEXT_PUBLIC_CHATMAA_NAME=John Doe
```

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
            baseUrl: "${process.env.NEXT_PUBLIC_CHATMAA_BASE_URL}",
            ${process.env.NEXT_PUBLIC_CHATMAA_EMAIL ? `email: "${process.env.NEXT_PUBLIC_CHATMAA_EMAIL}",` : ''}
            ${process.env.NEXT_PUBLIC_CHATMAA_NAME ? `name: "${process.env.NEXT_PUBLIC_CHATMAA_NAME}",` : ''}
          };
        `}
      </Script>
      <Script 
        src="/path/to/script.js" 
        strategy="afterInteractive"
      />
      <Component {...pageProps} />
    </>
  )
}
```

### Method 4: Dynamic User Information with Next.js

If you need to set user information dynamically (e.g., after authentication), create a custom hook:

**`hooks/useChatMAA.ts`:**

```typescript
import { useEffect } from 'react'

interface ChatMAAUser {
  email?: string
  name?: string
}

export function useChatMAA(user?: ChatMAAUser) {
  useEffect(() => {
    if (user && window.ChatMAA) {
      if (user.email) window.ChatMAA.config.email = user.email
      if (user.name) window.ChatMAA.config.name = user.name
    } else if (user && window.ChatMAAConfig) {
      if (user.email) window.ChatMAAConfig.email = user.email
      if (user.name) window.ChatMAAConfig.name = user.name
    }
  }, [user])
}
```

**Usage in a page component:**

```typescript
import { useSession } from 'next-auth/react' // or your auth solution
import { useChatMAA } from '../hooks/useChatMAA'

export default function HomePage() {
  const { data: session } = useSession()
  
  useChatMAA(session?.user ? {
    email: session.user.email,
    name: session.user.name
  } : undefined)

  return <div>Your page content</div>
}
```

### Next.js Best Practices

1. **Place script in `public` folder**: Copy `script.js` to `public/script.js` and reference it as `/script.js`
2. **Use `strategy="afterInteractive"`**: This ensures the script loads after the page becomes interactive
3. **TypeScript support**: Add type declarations for `window.ChatMAA` and `window.ChatMAAConfig` in a `types/chatmaa.d.ts` file:

```typescript
// types/chatmaa.d.ts
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

## Configuration Options

Configure the widget by setting `window.ChatMAAConfig` before loading the script:

```javascript
window.ChatMAAConfig = {
    // Required: Your ChatMAA instance base URL (domain)
    baseUrl: "https://your-domain.com",
    
    // Optional: User email address
    email: "user@example.com",
    
    // Optional: User name
    name: "John Doe",
    
    // Optional: Position of the launcher button
    // Options: "bottom-right", "bottom-left", "top-right", "top-left"
    position: "bottom-right",
    
    // Optional: Primary color for the launcher button (hex color)
    primaryColor: "#2563eb",
    
    // Optional: Launcher button icon (emoji or HTML)
    launcherIcon: "💬",
    
    // Optional: Widget dimensions
    width: 360,      // Widget width in pixels
    height: 500,     // Widget height in pixels
    
    // Optional: z-index for the widget
    zIndex: 9999
};
```

### Configuration Examples

#### Basic Configuration

```javascript
window.ChatMAAConfig = {
    baseUrl: "https://app.chatmaa.com"
};
```

#### Custom Domain Configuration

```javascript
window.ChatMAAConfig = {
    baseUrl: "https://chat.yourcompany.com",
    email: "user@example.com",
    name: "Jane Doe"
};
```

#### Fully Customized Configuration

```javascript
window.ChatMAAConfig = {
    baseUrl: "https://your-domain.com",
    email: "user@example.com",
    name: "John Smith",
    position: "bottom-left",
    primaryColor: "#10b981",
    launcherIcon: "💬",
    width: 400,
    height: 600,
    zIndex: 10000
};
```

## API Methods

After the script loads, you can control the widget programmatically using `window.ChatMAA`:

### `ChatMAA.open()`

Opens the chat widget:

```javascript
window.ChatMAA.open();
```

### `ChatMAA.close()`

Closes the chat widget:

```javascript
window.ChatMAA.close();
```

### `ChatMAA.destroy()`

Completely removes the widget and launcher from the page:

```javascript
window.ChatMAA.destroy();
```

### `ChatMAA.config`

Access the current configuration:

```javascript
console.log(window.ChatMAA.config);
```

## Usage Examples

### Example 1: Basic Integration

```html
<!DOCTYPE html>
<html>
<head>
    <title>My Website</title>
</head>
<body>
    <h1>Welcome to My Website</h1>
    
    <script>
        window.ChatMAAConfig = {
            baseUrl: "https://app.chatmaa.com"
        };
    </script>
    <script src="script.js"></script>
</body>
</html>
```

### Example 2: Programmatic Control

```html
<button onclick="window.ChatMAA.open()">Open Chat</button>
<button onclick="window.ChatMAA.close()">Close Chat</button>
<button onclick="window.ChatMAA.destroy()">Remove Widget</button>

<script>
    window.ChatMAAConfig = {
        baseUrl: "https://app.chatmaa.com"
    };
</script>
<script src="script.js"></script>
```

### Example 3: Dynamic User Information

```javascript
// Set user information dynamically after user login
function onUserLogin(email, name) {
    if (window.ChatMAA) {
        window.ChatMAA.config.email = email;
        window.ChatMAA.config.name = name;
    } else {
        window.ChatMAAConfig = window.ChatMAAConfig || {};
        window.ChatMAAConfig.email = email;
        window.ChatMAAConfig.name = name;
    }
}

// Initialize widget
window.ChatMAAConfig = {
    baseUrl: "https://app.chatmaa.com"
};
```

## Features

- **Auto-restore**: The widget automatically restores its open/closed state across page navigations using localStorage
- **Cross-domain support**: Works with any domain by configuring the `baseUrl` parameter
- **Customizable**: Position, colors, size, and icon can all be customized
- **Lightweight**: Minimal JavaScript footprint
- **No dependencies**: Pure vanilla JavaScript, no frameworks required
- **PostMessage API**: The widget can communicate with the parent page via postMessage

## PostMessage Communication

The widget listens for messages from the iframe and can be controlled via postMessage:

```javascript
// From the iframe, send these messages to control the widget:
window.parent.postMessage("chatmaa:open", "*");
window.parent.postMessage("chatmaa:close", "*");
window.parent.postMessage("chatmaa:destroy", "*");
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Notes

- The script prevents double-loading automatically
- The widget path is always `/widget` appended to your `baseUrl`
- The launcher button is always visible unless destroyed
- Widget state persists across page reloads using localStorage
- **Iframe Parameters**: Only `baseUrl` (required), `email`, and `name` are passed as URL parameters to the iframe. All other configuration options are for the launcher button and widget styling only.

## Troubleshooting

### Widget not appearing?

1. Check that `baseUrl` is correctly set (required)
2. Check browser console for errors
3. Ensure the script is loaded after the configuration

### Widget not loading content?

1. Verify the `baseUrl` points to a valid ChatMAA instance
2. Check that the domain allows iframe embedding
3. Verify CORS settings on your ChatMAA server

### Styling conflicts?

1. Adjust the `zIndex` if the widget is behind other elements
2. Check for CSS conflicts with the launcher button ID: `#chatmaa-launcher`

## License

[Add your license information here]

