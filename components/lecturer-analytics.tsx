import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Bar, Line } from "react-chartjs-2"
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js'

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend
)

export function LecturerAnalytics() {
    // Sample data - replace with actual data from your backend
    const studentEngagementData = {
        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
        datasets: [
            {
                label: 'Active Students',
                data: [65, 70, 80, 85],
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1
            }
        ]
    }

    const questionDistributionData = {
        labels: ['Answered', 'Pending', 'Needs Review'],
        datasets: [
            {
                data: [300, 50, 100],
                backgroundColor: [
                    'rgb(75, 192, 192)',
                    'rgb(255, 205, 86)',
                    'rgb(255, 99, 132)'
                ]
            }
        ]
    }

    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
                <CardHeader>
                    <CardTitle>Student Engagement</CardTitle>
                    <CardDescription>Weekly active students</CardDescription>
                </CardHeader>
                <CardContent>
                    <Line data={studentEngagementData} />
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Questions Overview</CardTitle>
                    <CardDescription>Distribution of questions</CardDescription>
                </CardHeader>
                <CardContent>
                    <Bar data={questionDistributionData} />
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Key Metrics</CardTitle>
                    <CardDescription>Performance indicators</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div>
                            <h4 className="text-sm font-medium">Average Response Time</h4>
                            <p className="text-2xl font-bold">2.5 hours</p>
                        </div>
                        <div>
                            <h4 className="text-sm font-medium">Student Satisfaction</h4>
                            <p className="text-2xl font-bold">4.8/5.0</p>
                        </div>
                        <div>
                            <h4 className="text-sm font-medium">Total Students</h4>
                            <p className="text-2xl font-bold">1,234</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
