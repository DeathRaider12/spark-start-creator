import React from 'react'
import { Alert, AlertDescription, AlertTitle } from './ui/alert'
import { Button } from './ui/button'

interface Props {
    children?: React.ReactNode
}

interface State {
    hasError: boolean
    error?: Error
}

export class ErrorBoundary extends React.Component<Props, State> {
    public state: State = {
        hasError: false
    }

    public static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error }
    }

    public render() {
        if (this.state.hasError) {
            return (
                <Alert variant="destructive" className="m-4">
                    <AlertTitle>Something went wrong!</AlertTitle>
                    <AlertDescription>
                        {this.state.error?.message}
                        <Button
                            variant="outline"
                            className="mt-4"
                            onClick={() => this.setState({ hasError: false })}
                        >
                            Try again
                        </Button>
                    </AlertDescription>
                </Alert>
            )
        }

        return this.props.children
    }
}
