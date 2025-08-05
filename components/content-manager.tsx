import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { Button } from './ui/button'
import { RichEditor } from './rich-editor'

interface ContentItem {
    id: string
    title: string
    type: 'lesson' | 'quiz' | 'resource'
    content: string
    createdAt: Date
    updatedAt: Date
}

export function ContentManager() {
    const [activeTab, setActiveTab] = useState<string>('lessons')
    const [items, setItems] = useState<ContentItem[]>([])
    const [editingContent, setEditingContent] = useState<string>('')

    const handleSave = async () => {
        // Implement save logic here
        console.log('Saving content:', editingContent)
    }

    return (
        <div className="space-y-4">
            <Card>
                <CardHeader>
                    <CardTitle>Content Manager</CardTitle>
                </CardHeader>
                <CardContent>
                    <Tabs value={activeTab} onValueChange={setActiveTab}>
                        <TabsList className="grid w-full grid-cols-3">
                            <TabsTrigger value="lessons">Lessons</TabsTrigger>
                            <TabsTrigger value="quizzes">Quizzes</TabsTrigger>
                            <TabsTrigger value="resources">Resources</TabsTrigger>
                        </TabsList>

                        <TabsContent value="lessons">
                            <div className="space-y-4">
                                <Button>Create New Lesson</Button>
                                <RichEditor
                                    placeholder="Start writing your lesson content..."
                                    onChange={setEditingContent}
                                />
                                <div className="flex justify-end space-x-2">
                                    <Button variant="outline">Preview</Button>
                                    <Button onClick={handleSave}>Save Lesson</Button>
                                </div>
                            </div>
                        </TabsContent>

                        <TabsContent value="quizzes">
                            <div className="space-y-4">
                                <Button>Create New Quiz</Button>
                                {/* Add quiz creation interface */}
                            </div>
                        </TabsContent>

                        <TabsContent value="resources">
                            <div className="space-y-4">
                                <Button>Upload Resource</Button>
                                {/* Add resource upload interface */}
                            </div>
                        </TabsContent>
                    </Tabs>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Content Library</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-2">
                        {items.map((item) => (
                            <div
                                key={item.id}
                                className="flex items-center justify-between p-2 border rounded hover:bg-accent"
                            >
                                <div>
                                    <h3 className="font-medium">{item.title}</h3>
                                    <p className="text-sm text-muted-foreground">
                                        Last updated: {item.updatedAt.toLocaleDateString()}
                                    </p>
                                </div>
                                <div className="space-x-2">
                                    <Button variant="outline" size="sm">
                                        Edit
                                    </Button>
                                    <Button variant="outline" size="sm">
                                        Delete
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
