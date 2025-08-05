import { useState } from 'react'
import dynamic from 'next/dynamic'
import 'react-quill/dist/quill.snow.css'
import { Button } from './ui/button'

// Dynamic import of ReactQuill to avoid SSR issues
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })

interface RichEditorProps {
    initialValue?: string
    onChange?: (value: string) => void
    placeholder?: string
}

export function RichEditor({ initialValue = '', onChange, placeholder }: RichEditorProps) {
    const [value, setValue] = useState(initialValue)

    const modules = {
        toolbar: [
            [{ 'header': [1, 2, 3, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            ['blockquote', 'code-block'],
            ['link', 'image', 'formula'],
            ['clean']
        ],
        syntax: true,
    }

    const formats = [
        'header',
        'bold', 'italic', 'underline', 'strike',
        'list', 'bullet',
        'blockquote', 'code-block',
        'link', 'image', 'formula'
    ]

    return (
        <div className="rich-editor-container">
            <ReactQuill
                theme="snow"
                value={value}
                onChange={(content) => {
                    setValue(content)
                    onChange?.(content)
                }}
                modules={modules}
                formats={formats}
                placeholder={placeholder}
                className="bg-background"
            />
            <div className="mt-2 text-sm text-muted-foreground">
                Supports Markdown, LaTeX equations, and code snippets
            </div>
        </div>
    )
}
