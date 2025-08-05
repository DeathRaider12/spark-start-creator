import { useEffect, useRef, KeyboardEvent } from 'react'

type KeyHandler = (event: KeyboardEvent) => void

interface UseKeyboardNavigationProps {
    onArrowUp?: KeyHandler
    onArrowDown?: KeyHandler
    onArrowLeft?: KeyHandler
    onArrowRight?: KeyHandler
    onEnter?: KeyHandler
    onEscape?: KeyHandler
    onTab?: KeyHandler
}

export function useKeyboardNavigation({
    onArrowUp,
    onArrowDown,
    onArrowLeft,
    onArrowRight,
    onEnter,
    onEscape,
    onTab,
}: UseKeyboardNavigationProps) {
    const handleKeyDown = (event: KeyboardEvent) => {
        switch (event.key) {
            case 'ArrowUp':
                onArrowUp?.(event)
                break
            case 'ArrowDown':
                onArrowDown?.(event)
                break
            case 'ArrowLeft':
                onArrowLeft?.(event)
                break
            case 'ArrowRight':
                onArrowRight?.(event)
                break
            case 'Enter':
                onEnter?.(event)
                break
            case 'Escape':
                onEscape?.(event)
                break
            case 'Tab':
                onTab?.(event)
                break
        }
    }

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown as any)
        return () => {
            document.removeEventListener('keydown', handleKeyDown as any)
        }
    }, [
        onArrowUp,
        onArrowDown,
        onArrowLeft,
        onArrowRight,
        onEnter,
        onEscape,
        onTab,
    ])
}
