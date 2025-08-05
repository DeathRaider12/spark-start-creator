import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { RadioGroup, RadioGroupItem } from "./ui/radio-group"
import { Label } from "./ui/label"
import { Progress } from "./ui/progress"

interface QuizQuestion {
    id: string
    question: string
    options: string[]
    correctAnswer: number
    explanation?: string
}

interface Quiz {
    id: string
    title: string
    description: string
    questions: QuizQuestion[]
    timeLimit?: number // in minutes
}

export function QuizPlayer({ quiz }: { quiz: Quiz }) {
    const [currentQuestion, setCurrentQuestion] = useState(0)
    const [answers, setAnswers] = useState<Record<string, number>>({})
    const [showResults, setShowResults] = useState(false)
    const [timeRemaining, setTimeRemaining] = useState(quiz.timeLimit ?? 0)

    const handleAnswer = (questionId: string, answerIndex: number) => {
        setAnswers(prev => ({
            ...prev,
            [questionId]: answerIndex
        }))
    }

    const calculateScore = () => {
        let correct = 0
        Object.entries(answers).forEach(([questionId, answer]) => {
            const question = quiz.questions.find(q => q.id === questionId)
            if (question && question.correctAnswer === answer) {
                correct++
            }
        })
        return (correct / quiz.questions.length) * 100
    }

    const question = quiz.questions[currentQuestion]
    const progress = ((currentQuestion + 1) / quiz.questions.length) * 100

    if (showResults) {
        const score = calculateScore()
        return (
            <Card>
                <CardHeader>
                    <CardTitle>Quiz Results</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="text-center">
                        <p className="text-3xl font-bold">{score.toFixed(1)}%</p>
                        <p className="text-muted-foreground">
                            {Math.round(score)}% Correct
                        </p>
                    </div>

                    <div className="space-y-4">
                        {quiz.questions.map((q, index) => {
                            const userAnswer = answers[q.id]
                            const isCorrect = userAnswer === q.correctAnswer

                            return (
                                <div key={q.id} className="space-y-2">
                                    <p className="font-medium">
                                        Question {index + 1}: {q.question}
                                    </p>
                                    <p className={`text-sm ${isCorrect ? "text-green-500" : "text-red-500"}`}>
                                        Your answer: {q.options[userAnswer]}
                                    </p>
                                    {!isCorrect && (
                                        <p className="text-sm text-muted-foreground">
                                            Correct answer: {q.options[q.correctAnswer]}
                                        </p>
                                    )}
                                    {q.explanation && (
                                        <p className="text-sm text-muted-foreground">
                                            {q.explanation}
                                        </p>
                                    )}
                                </div>
                            )
                        })}
                    </div>

                    <Button
                        className="w-full"
                        onClick={() => {
                            setCurrentQuestion(0)
                            setAnswers({})
                            setShowResults(false)
                        }}
                    >
                        Retake Quiz
                    </Button>
                </CardContent>
            </Card>
        )
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>{quiz.title}</CardTitle>
                <Progress value={progress} className="mt-2" />
            </CardHeader>
            <CardContent className="space-y-4">
                <div>
                    <p className="text-lg font-medium mb-4">{question.question}</p>
                    <RadioGroup
                        value={answers[question.id]?.toString()}
                        onValueChange={(value) => handleAnswer(question.id, Number(value))}
                    >
                        {question.options.map((option, index) => (
                            <div key={index} className="flex items-center space-x-2">
                                <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                                <Label htmlFor={`option-${index}`}>{option}</Label>
                            </div>
                        ))}
                    </RadioGroup>
                </div>

                <div className="flex justify-between">
                    <Button
                        variant="outline"
                        disabled={currentQuestion === 0}
                        onClick={() => setCurrentQuestion(prev => prev - 1)}
                    >
                        Previous
                    </Button>

                    {currentQuestion === quiz.questions.length - 1 ? (
                        <Button onClick={() => setShowResults(true)}>
                            Finish Quiz
                        </Button>
                    ) : (
                        <Button
                            disabled={!answers[question.id]}
                            onClick={() => setCurrentQuestion(prev => prev + 1)}
                        >
                            Next
                        </Button>
                    )}
                </div>
            </CardContent>
        </Card>
    )
}
