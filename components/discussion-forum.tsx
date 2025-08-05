import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "./ui/dialog"
import { RichEditor } from "./rich-editor"

interface ForumPost {
    id: string
    title: string
    content: string
    author: {
        id: string
        name: string
        avatar?: string
    }
    createdAt: Date
    replies: number
    views: number
    tags: string[]
}

export function ForumPost({ post }: { post: ForumPost }) {
    return (
        <Card>
            <CardContent className="p-4">
                <div className="flex items-start space-x-4">
                    <Avatar>
                        <AvatarImage src={post.author.avatar} />
                        <AvatarFallback>{post.author.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                        <div className="flex items-center justify-between">
                            <h3 className="font-medium">{post.title}</h3>
                            <span className="text-sm text-muted-foreground">
                                {post.createdAt.toLocaleDateString()}
                            </span>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                            {post.content.substring(0, 150)}...
                        </p>
                        <div className="flex items-center space-x-4 mt-4">
                            <span className="text-sm text-muted-foreground">
                                {post.replies} replies
                            </span>
                            <span className="text-sm text-muted-foreground">
                                {post.views} views
                            </span>
                            <div className="flex-1" />
                            <div className="flex gap-2">
                                {post.tags.map(tag => (
                                    <span key={tag} className="px-2 py-1 text-xs bg-secondary rounded-full">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export function DiscussionForum() {
    const [posts, setPosts] = useState<ForumPost[]>([])
    const [newPostContent, setNewPostContent] = useState("")

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">Discussion Forum</h2>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button>New Discussion</Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Create New Discussion</DialogTitle>
                            <DialogDescription>
                                Start a new discussion thread
                            </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                            <RichEditor
                                placeholder="What would you like to discuss?"
                                onChange={setNewPostContent}
                            />
                            <div className="flex justify-end">
                                <Button onClick={() => {
                                    // Implement post creation logic
                                    console.log('New post:', newPostContent)
                                }}>
                                    Post Discussion
                                </Button>
                            </div>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="space-y-4">
                {posts.map(post => (
                    <ForumPost key={post.id} post={post} />
                ))}
            </div>
        </div>
    )
}
