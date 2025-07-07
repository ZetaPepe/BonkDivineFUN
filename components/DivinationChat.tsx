"use client"

import type React from "react"
import { useState } from "react"
import { useChat } from "ai/react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Sparkles, SnowflakeIcon as Crystal, AlertCircle, ArrowLeft } from "lucide-react"

const divinationTopics = [
  { text: "今天运势如何？", translation: "How is my fortune today?" },
  { text: "事业发展前景？", translation: "What are my career development prospects?" },
  { text: "感情婚姻状况？", translation: "How is my love and marriage situation?" },
  { text: "财运走势分析？", translation: "What is my financial fortune trend?" },
  { text: "健康状况如何？", translation: "How is my health condition?" },
  { text: "学业考试运势？", translation: "How is my academic and exam fortune?" },
]

export default function DivinationChat() {
  const [showChat, setShowChat] = useState(false)
  const { messages, input, handleInputChange, handleSubmit, isLoading, error, setMessages } = useChat({
    api: "/api/divination",
    onError: (error) => {
      console.error("Divination chat error:", error)
    },
  })

  const handleTopicClick = (topic: string) => {
    const syntheticEvent = {
      target: { value: topic },
    } as React.ChangeEvent<HTMLInputElement>

    handleInputChange(syntheticEvent)
    setShowChat(true)

    setTimeout(() => {
      const submitEvent = { preventDefault: () => {} } as React.FormEvent
      handleSubmit(submitEvent)
    }, 100)
  }

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return
    setShowChat(true)
    handleSubmit(e)
  }

  const handleBackToMain = () => {
    setShowChat(false)
    setMessages([]) // 清空聊天记录
  }

  return (
    <div className="w-full max-w-2xl">
      {showChat ? (
        /* Chat Interface */
        <Card className="bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-indigo-900/20 border-purple-500/30 text-white backdrop-blur-sm">
          <CardContent className="p-6">
            {/* Back Button */}
            <div className="flex items-center justify-between mb-4">
              <Button
                variant="ghost"
                onClick={handleBackToMain}
                className="text-gray-400 hover:text-white flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                返回主页
              </Button>
              <div className="flex items-center gap-2 text-purple-300">
                <Crystal className="w-5 h-5" />
                <span className="text-sm font-medium">🔮 易经算卦大师</span>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="max-h-96 overflow-y-auto space-y-4 mb-6">
              {messages.length === 0 && !isLoading && (
                <div className="text-center text-purple-300 py-8">
                  <Crystal className="w-12 h-12 mx-auto mb-4 text-purple-400 animate-pulse" />
                  <p className="text-lg font-medium mb-2">易经八卦，洞察天机</p>
                  <p className="text-sm text-gray-400">请提出您想要算卦的问题...</p>
                </div>
              )}

              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[80%] p-4 rounded-2xl ${
                      message.role === "user"
                        ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white"
                        : "bg-gray-800/70 text-gray-100 border border-purple-500/20"
                    }`}
                  >
                    {message.role === "assistant" && (
                      <div className="flex items-center gap-2 mb-2 text-purple-300">
                        <Crystal className="w-4 h-4" />
                        <span className="text-xs font-medium">易经算卦大师</span>
                      </div>
                    )}
                    <p className="whitespace-pre-wrap text-sm">{message.content}</p>
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-gray-800/70 border border-purple-500/20 p-4 rounded-2xl">
                    <div className="flex items-center gap-2 text-purple-300 mb-2">
                      <Crystal className="w-4 h-4 animate-spin" />
                      <span className="text-xs font-medium">正在推演卦象...</span>
                    </div>
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" />
                      <div
                        className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      />
                      <div
                        className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      />
                    </div>
                  </div>
                </div>
              )}

              {error && (
                <div className="flex justify-start">
                  <div className="bg-red-900/50 border border-red-500/30 p-4 rounded-2xl max-w-[80%]">
                    <div className="flex items-center gap-2 text-red-300 mb-2">
                      <AlertCircle className="w-4 h-4" />
                      <span className="text-xs font-medium">连接错误</span>
                    </div>
                    <p className="text-sm text-red-200">天机不可泄露，请检查您的灵性连接配置。</p>
                  </div>
                </div>
              )}
            </div>

            {/* Input Form */}
            <form onSubmit={onSubmit} className="flex gap-3">
              <input
                type="text"
                value={input}
                onChange={handleInputChange}
                placeholder="请输入您的问题或生日地区信息..."
                className="flex-1 bg-gray-800/50 border border-purple-500/30 text-white placeholder-purple-300/60 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                disabled={isLoading}
              />
              <Button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 px-6"
              >
                <Sparkles className="w-4 h-4" />
              </Button>
            </form>

            {/* Additional Action Buttons */}
            <div className="flex gap-2 mt-4">
              <Button
                variant="outline"
                onClick={handleBackToMain}
                className="bg-gray-800/50 border-gray-600/50 text-white hover:bg-gray-700/50 text-sm"
              >
                🔮 重新算卦
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  const topics = divinationTopics[Math.floor(Math.random() * divinationTopics.length)]
                  handleTopicClick(topics.translation)
                }}
                className="bg-gray-800/50 border-gray-600/50 text-white hover:bg-gray-700/50 text-sm"
                disabled={isLoading}
              >
                ✨ 随机算卦
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        /* Initial Fortune Selection - Matching your image layout */
        <div className="space-y-6">
          {/* Title */}
          <h2 className="text-2xl font-medium text-white text-center">您想算点什么？</h2>

          {/* Large Input Area */}
          <div className="relative">
            <form onSubmit={onSubmit} className="flex gap-4">
              <textarea
                value={input}
                onChange={handleInputChange}
                placeholder="将使用易经八卦为您解读"
                className="flex-1 min-h-[120px] bg-gray-800/50 border border-gray-600/50 text-white placeholder-gray-400 rounded-lg px-4 py-3 resize-none focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                disabled={isLoading}
              />
              <Button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="bg-white text-gray-900 hover:bg-gray-100 px-8 py-3 rounded-lg font-medium self-end"
              >
                开始
              </Button>
            </form>
          </div>

          {/* Suggestion Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-white">
              <span className="text-lg">😊</span>
              <span className="text-lg">让我猜猜您算什么东西？</span>
            </div>

            {/* Topic Buttons Grid - Matching your image layout */}
            <div className="space-y-3">
              {/* First row - 4 buttons */}
              <div className="grid grid-cols-3 gap-3">
                {divinationTopics.slice(0, 3).map((topic, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    onClick={() => handleTopicClick(topic.translation)}
                    className="bg-gray-800/50 border-gray-600/50 text-white hover:bg-gray-700/50 text-sm py-3 px-4"
                    disabled={isLoading}
                  >
                    {topic.text}
                  </Button>
                ))}
              </div>

              {/* Second row - 3 buttons */}
              <div className="grid grid-cols-3 gap-3">
                {divinationTopics.slice(3, 6).map((topic, index) => (
                  <Button
                    key={index + 3}
                    variant="outline"
                    onClick={() => handleTopicClick(topic.translation)}
                    className="bg-gray-800/50 border-gray-600/50 text-white hover:bg-gray-700/50 text-sm py-3 px-4"
                    disabled={isLoading}
                  >
                    {topic.text}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {error && (
            <div className="bg-red-900/50 border border-red-500/30 p-4 rounded-lg">
              <div className="flex items-center gap-2 text-red-300 mb-2">
                <AlertCircle className="w-4 h-4" />
                <span className="text-sm font-medium">API 配置错误</span>
              </div>
              <p className="text-sm text-red-200">请设置您的 OPENAI_API_KEY 环境变量以使用算卦功能。</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
