import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Input } from "./ui/input"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "./ui/dialog"

interface StudyGroup {
    id: string
    name: string
    description: string
    members: {
        id: string
        name: string
        avatar?: string
        role: "admin" | "member"
    }[]
    course: string
    meetingTime?: string
    tags: string[]
}

export function StudyGroupCard({ group }: { group: StudyGroup }) {
    return (
        <Card>
            <CardContent className="p-4">
                <div className="space-y-4">
                    <div>
                        <h3 className="font-medium">{group.name}</h3>
                        <p className="text-sm text-muted-foreground">{group.description}</p>
                    </div>

                    <div>
                        <h4 className="text-sm font-medium mb-2">Members</h4>
                        <div className="flex -space-x-2">
                            {group.members.map(member => (
                                <Avatar key={member.id} className="border-2 border-background">
                                    <AvatarImage src={member.avatar} />
                                    <AvatarFallback>{member.name[0]}</AvatarFallback>
                                </Avatar>
                            ))}
                        </div>
                    </div>

                    {group.meetingTime && (
                        <div>
                            <h4 className="text-sm font-medium">Next Meeting</h4>
                            <p className="text-sm text-muted-foreground">{group.meetingTime}</p>
                        </div>
                    )}

                    <div className="flex gap-2">
                        {group.tags.map(tag => (
                            <span key={tag} className="px-2 py-1 text-xs bg-secondary rounded-full">
                                {tag}
                            </span>
                        ))}
                    </div>

                    <Button className="w-full">Join Group</Button>
                </div>
            </CardContent>
        </Card>
    )
}

export function CreateStudyGroup() {
    const [groupName, setGroupName] = useState("")
    const [description, setDescription] = useState("")
    const [course, setCourse] = useState("")

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>Create Study Group</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create New Study Group</DialogTitle>
                    <DialogDescription>
                        Create a new study group for collaboration
                    </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Group Name</label>
                        <Input
                            placeholder="Enter group name"
                            value={groupName}
                            onChange={e => setGroupName(e.target.value)}
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Description</label>
                        <Input
                            placeholder="Describe your study group"
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Course</label>
                        <Input
                            placeholder="Select course"
                            value={course}
                            onChange={e => setCourse(e.target.value)}
                        />
                    </div>

                    <Button className="w-full" onClick={() => {
                        // Implement group creation logic
                        console.log('New group:', { groupName, description, course })
                    }}>
                        Create Group
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export function StudyGroups() {
    const [groups, setGroups] = useState<StudyGroup[]>([])

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">Study Groups</h2>
                <CreateStudyGroup />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {groups.map(group => (
                    <StudyGroupCard key={group.id} group={group} />
                ))}
            </div>
        </div>
    )
}
