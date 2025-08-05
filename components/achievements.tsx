import { Badge } from "./ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip"
import { Trophy, Star, Zap, BookOpen, Target, Award } from "lucide-react"

interface Achievement {
    id: string
    title: string
    description: string
    icon: 'trophy' | 'star' | 'zap' | 'book' | 'target' | 'award'
    earnedDate?: Date
    progress?: {
        current: number
        total: number
    }
}

const icons = {
    trophy: Trophy,
    star: Star,
    zap: Zap,
    book: BookOpen,
    target: Target,
    award: Award,
}

export function AchievementBadge({ achievement }: { achievement: Achievement }) {
    const Icon = icons[achievement.icon]
    const earned = !!achievement.earnedDate

    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger>
                    <div
                        className={`p-3 rounded-full ${earned ? 'bg-primary' : 'bg-muted'
                            }`}
                    >
                        <Icon className={`w-6 h-6 ${earned ? 'text-primary-foreground' : 'text-muted-foreground'
                            }`} />
                    </div>
                </TooltipTrigger>
                <TooltipContent>
                    <div className="space-y-2">
                        <h3 className="font-medium">{achievement.title}</h3>
                        <p className="text-sm text-muted-foreground">
                            {achievement.description}
                        </p>
                        {achievement.progress && (
                            <div className="text-xs">
                                Progress: {achievement.progress.current}/{achievement.progress.total}
                            </div>
                        )}
                        {achievement.earnedDate && (
                            <div className="text-xs">
                                Earned: {achievement.earnedDate.toLocaleDateString()}
                            </div>
                        )}
                    </div>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}

export function AchievementsDisplay({ achievements }: { achievements: Achievement[] }) {
    const earnedAchievements = achievements.filter(a => a.earnedDate)
    const inProgressAchievements = achievements.filter(a => !a.earnedDate)

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Trophy className="w-5 h-5" />
                        Your Achievements
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div>
                            <h3 className="text-lg font-medium mb-2">Earned Badges</h3>
                            <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
                                {earnedAchievements.map((achievement) => (
                                    <AchievementBadge key={achievement.id} achievement={achievement} />
                                ))}
                            </div>
                        </div>

                        <div>
                            <h3 className="text-lg font-medium mb-2">In Progress</h3>
                            <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
                                {inProgressAchievements.map((achievement) => (
                                    <AchievementBadge key={achievement.id} achievement={achievement} />
                                ))}
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
