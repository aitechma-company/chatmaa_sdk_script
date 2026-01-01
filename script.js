(function () {
    if (window.ChatMAA) return; // prevent double load

    const DEFAULTS = {
        baseUrl: null, // Required: Your ChatMAA instance base URL
        email: null,
        name: null,
        position: "bottom-right", // bottom-left, top-right, top-left
        primaryColor: "#2563eb",
        launcherIcon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M22 10.787c0 4.854-4.253 8.788-9.5 8.788a10.22 10.22 0 0 1-2.684-.355c-1.881 1.241-4.233 1.617-5.485 1.73-.286.027-.434-.347-.24-.559.595-.65 1.431-1.803 1.715-3.368C4.073 15.43 3 13.225 3 10.787 3 5.934 7.253 2 12.5 2S22 5.934 22 10.787z" fill="currentColor"/></svg>',
        width: 360,
        height: 500,
        zIndex: 9999
    };

    const CONFIG = Object.assign({}, DEFAULTS, window.ChatMAAConfig || {});
    const STORAGE_KEY = "chatmaa:open";

    let launcher = null;
    let iframe = null;

    /* --------------------------------
       Helpers
    ---------------------------------*/

    function isMobile() {
        // More robust mobile detection
        const width = window.innerWidth || document.documentElement.clientWidth || window.screen.width;
        const userAgent = navigator.userAgent || navigator.vendor || window.opera;
        const mobileRegex = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i;
        return width <= 768 || mobileRegex.test(userAgent);
    }

    function getPositionStyles(position) {
        const styles = { position: "fixed" };

        if (position.includes("bottom")) styles.bottom = "20px";
        if (position.includes("top")) styles.top = "20px";
        if (position.includes("right")) styles.right = "20px";
        if (position.includes("left")) styles.left = "20px";

        return styles;
    }

    function getCloseIcon() {
        return '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x-icon lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>';
    }

    function updateLauncherIcon(isOpen) {
        if (!launcher) return;
        launcher.innerHTML = isOpen ? getCloseIcon() : CONFIG.launcherIcon;
    }

    function buildIframeUrl() {
        const params = new URLSearchParams();

        if (CONFIG.email) params.set("email", CONFIG.email);
        if (CONFIG.name) params.set("name", CONFIG.name);

        const baseUrl = CONFIG.baseUrl;
        if (!baseUrl) {
            console.error("ChatMAA: baseUrl is required");
            return "";
        }
        
        const url = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
        
        return `${url}/widget?${params.toString()}`;
    }

    /* --------------------------------
       Launcher Button
    ---------------------------------*/

    function createLauncher() {
        if (launcher) return;
        
        // Ensure document.body exists
        if (!document.body) {
            console.error("ChatMAA: document.body is not available");
            return;
        }

        launcher = document.createElement("div");
        launcher.id = "chatmaa-launcher";
        launcher.innerHTML = CONFIG.launcherIcon;
        launcher.setAttribute("role", "button");
        launcher.setAttribute("aria-label", "Open chat");

        Object.assign(launcher.style, {
            width: "56px",
            height: "56px",
            borderRadius: "50%",
            background: CONFIG.primaryColor,
            color: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            boxShadow: "0 10px 25px rgba(0,0,0,.2)",
            fontSize: "22px",
            zIndex: CONFIG.zIndex,
            WebkitTapHighlightColor: "transparent", // Remove tap highlight on mobile
            userSelect: "none",
            ...getPositionStyles(CONFIG.position)
        });

        // Use a single handler that works for both click and touch
        function handleToggle(e) {
            e.preventDefault();
            e.stopPropagation();
            toggle();
        }

        launcher.addEventListener("click", handleToggle);
        launcher.addEventListener("touchend", handleToggle);
        
        // Ensure body exists before appending
        if (document.body) {
            document.body.appendChild(launcher);
        } else {
            console.error("ChatMAA: Cannot append launcher - document.body not available");
        }
    }

    /* --------------------------------
       Widget (iframe)
    ---------------------------------*/

    function toggle() {
        if (iframe) {
            close();
        } else {
            open();
        }
    }

    function open() {
        if (iframe) return;
        
        // Ensure document.body exists
        if (!document.body) {
            console.error("ChatMAA: document.body is not available");
            return;
        }

        const iframeUrl = buildIframeUrl();
        if (!iframeUrl) {
            console.error("ChatMAA: Unable to build iframe URL");
            return;
        }

        iframe = document.createElement("iframe");
        iframe.id = "chatmaa-widget-iframe";
        iframe.src = iframeUrl;
        iframe.allow = "clipboard-write; microphone; camera";
        iframe.setAttribute("frameborder", "0");
        iframe.setAttribute("scrolling", "yes");
        iframe.setAttribute("allowfullscreen", "true");

        const mobile = isMobile();
        const baseStyles = {
            border: "none",
            background: "#fff",
            zIndex: CONFIG.zIndex - 1, // Slightly lower than launcher so launcher stays clickable
        };

        if (mobile) {
            // Fullscreen on mobile - use actual viewport height
            const viewportHeight = window.innerHeight || document.documentElement.clientHeight || window.screen.height;
            
            Object.assign(iframe.style, {
                ...baseStyles,
                position: "fixed",
                width: "100%",
                height: viewportHeight + "px",
                top: "0",
                left: "0",
                right: "0",
                bottom: "0",
                margin: "0",
                padding: "0",
                borderRadius: "0",
                boxShadow: "none",
                transform: "none",
                pointerEvents: "auto",
                visibility: "visible",
                opacity: "1",
                display: "block",
                WebkitOverflowScrolling: "touch", // Smooth scrolling on iOS
                zIndex: CONFIG.zIndex + 1 // Higher z-index on mobile to cover launcher
            });
            
            // Prevent body scroll on mobile when iframe is open
            const scrollY = window.scrollY;
            document.body.style.overflow = "hidden";
            document.body.style.position = "fixed";
            document.body.style.width = "100%";
            document.body.style.top = `-${scrollY}px`; // Preserve scroll position
            document.documentElement.style.overflow = "hidden";
        } else {
            // Desktop positioning
            Object.assign(iframe.style, {
                ...baseStyles,
                width: CONFIG.width + "px",
                height: CONFIG.height + "px",
                borderRadius: "12px",
                boxShadow: "0 20px 40px rgba(0,0,0,.3)",
                ...getPositionStyles(CONFIG.position),
                transform: CONFIG.position.includes("top")
                    ? "translateY(70px)"
                    : "translateY(-70px)"
            });
        }

        // Append to DOM first, then ensure it's visible
        document.body.appendChild(iframe);
        
        // Use requestAnimationFrame to ensure DOM is ready and styles are applied
        requestAnimationFrame(function() {
            if (iframe && iframe.parentNode) {
                // Force a reflow to ensure styles are applied
                iframe.offsetHeight;
                iframe.style.display = "block";
            }
        });

        // Handle iframe load event
        iframe.addEventListener("load", function() {
            if (iframe && mobile) {
                // Ensure iframe is visible after load on mobile
                iframe.style.display = "block";
                iframe.style.visibility = "visible";
                iframe.style.opacity = "1";
            }
        });

        // Handle iframe errors
        iframe.addEventListener("error", function() {
            console.error("ChatMAA: Failed to load iframe content");
        });

        localStorage.setItem(STORAGE_KEY, "1");
        updateLauncherIcon(true);
    }

    function close() {
        if (!iframe) return;
        
        // Restore body scroll on mobile
        if (isMobile()) {
            const scrollY = document.body.style.top;
            document.body.style.overflow = "";
            document.body.style.position = "";
            document.body.style.width = "";
            document.body.style.top = "";
            document.documentElement.style.overflow = "";
            
            // Restore scroll position
            if (scrollY) {
                window.scrollTo(0, parseInt(scrollY || "0") * -1);
            }
        }
        
        iframe.remove();
        iframe = null;
        localStorage.removeItem(STORAGE_KEY);
        updateLauncherIcon(false);
    }

    function destroy() {
        close();
        if (launcher) {
            launcher.remove();
            launcher = null;
        }
        delete window.ChatMAA;
    }

    /* --------------------------------
       Restore across pages
    ---------------------------------*/

    function restore() {
        if (localStorage.getItem(STORAGE_KEY)) {
            open();
        } else {
            updateLauncherIcon(false);
        }
    }

    // Handle window resize to adjust iframe on mobile/desktop switch
    let resizeTimeout;
    window.addEventListener("resize", function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(function() {
            if (iframe) {
                const mobile = isMobile();
                if (mobile) {
                    const viewportHeight = window.innerHeight || document.documentElement.clientHeight || window.screen.height;
                    const scrollY = window.scrollY;
                    
                    Object.assign(iframe.style, {
                        position: "fixed",
                        width: "100%",
                        height: viewportHeight + "px",
                        top: "0",
                        left: "0",
                        right: "0",
                        bottom: "0",
                        margin: "0",
                        padding: "0",
                        borderRadius: "0",
                        boxShadow: "none",
                        transform: "none",
                        pointerEvents: "auto",
                        visibility: "visible",
                        opacity: "1",
                        display: "block",
                        WebkitOverflowScrolling: "touch",
                        zIndex: CONFIG.zIndex + 1 // Higher z-index on mobile to cover launcher
                    });
                    
                    // Prevent body scroll on mobile when iframe is open
                    document.body.style.overflow = "hidden";
                    document.body.style.position = "fixed";
                    document.body.style.width = "100%";
                    document.body.style.top = `-${scrollY}px`;
                    document.documentElement.style.overflow = "hidden";
                } else {
                    Object.assign(iframe.style, {
                        width: CONFIG.width + "px",
                        height: CONFIG.height + "px",
                        borderRadius: "12px",
                        boxShadow: "0 20px 40px rgba(0,0,0,.3)",
                        ...getPositionStyles(CONFIG.position),
                        transform: CONFIG.position.includes("top")
                            ? "translateY(70px)"
                            : "translateY(-70px)"
                    });
                }
            }
        }, 250);
    });

    /* --------------------------------
       Iframe → Parent communication
    ---------------------------------*/

    window.addEventListener("message", function (event) {
        if (!event.data) return;
        
        // Optional: Add origin validation for security
        // if (event.origin !== expectedOrigin) return;

        if (event.data === "chatmaa:open") open();
        if (event.data === "chatmaa:close") close();
        if (event.data === "chatmaa:destroy") destroy();
    }, false);

    /* --------------------------------
       Public API
    ---------------------------------*/

    window.ChatMAA = {
        open,
        close,
        destroy,
        config: CONFIG
    };

    /* --------------------------------
       Init
    ---------------------------------*/

    function init() {
        // Ensure document is ready
        if (!document.body) {
            // Wait a bit more if body isn't ready
            setTimeout(init, 50);
            return;
        }
        
        createLauncher();
        restore();
    }

    // More robust initialization
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", init);
    } else if (document.readyState === "interactive" || document.readyState === "complete") {
        // Use setTimeout to ensure DOM is fully ready
        setTimeout(init, 0);
    } else {
        init();
    }
})();
