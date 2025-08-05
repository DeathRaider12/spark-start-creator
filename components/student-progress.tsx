import { Progress } from "./ui/progress"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"

interface CourseProgress {
    courseId: string
    courseName: string
    progress: number
    totalLessons: number
    completedLessons: number
    lastAccessed: Date
}

export function StudentProgress({ courses }: { courses: CourseProgress[] }) {
    return (
        <div className="space-y-4">
            <h2 className="text-2xl font-bold">Your Progress</h2>
            {courses.map((course) => (
                <Card key={course.courseId}>
                    <CardHeader>
                        <CardTitle>{course.courseName}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-2">
                            <Progress value={course.progress} className="w-full" />
                            <div className="flex justify-between text-sm text-muted-foreground">
                                <span>
                                    {course.completedLessons} of {course.totalLessons} lessons completed
                                </span>
                                <span>
                                    Last accessed: {course.lastAccessed.toLocaleDateString()}
                                </span>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}
