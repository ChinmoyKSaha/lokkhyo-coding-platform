"use client"

import { useState } from "react"
import Editor from "@monaco-editor/react"
import { Play, RotateCcw, Settings, Download, Share, Terminal } from "lucide-react"

const languages = [
  { value: "javascript", label: "JavaScript" },
  { value: "typescript", label: "TypeScript" },
  { value: "python", label: "Python" },
  { value: "java", label: "Java" },
  { value: "cpp", label: "C++" },
  { value: "csharp", label: "C#" },
  { value: "go", label: "Go" },
  { value: "rust", label: "Rust" },
  { value: "html", label: "HTML" },
  { value: "css", label: "CSS" },
]

const themes = [
  { value: "vs-dark", label: "Dark" },
  { value: "light", label: "Light" },
  { value: "hc-black", label: "High Contrast" },
]

const defaultCode = {
  javascript: `// Welcome to the CodePlatform Editor!
function greetUser(name) {
    return \`Hello, \${name}! Welcome to coding.\`;
}

console.log(greetUser("Developer"));

// Try running this code with the Play button`,
  
  python: `# Welcome to the CodePlatform Editor!
def greet_user(name):
    return f"Hello, {name}! Welcome to coding."

print(greet_user("Developer"))

# Try running this code with the Play button`,
  
  typescript: `// Welcome to the CodePlatform Editor!
function greetUser(name: string): string {
    return \`Hello, \${name}! Welcome to coding.\`;
}

console.log(greetUser("Developer"));

// Try running this code with the Play button`,
}

export default function CodeEditorPage() {
  const [code, setCode] = useState(defaultCode.javascript)
  const [language, setLanguage] = useState("javascript")
  const [theme, setTheme] = useState("vs-dark")
  const [output, setOutput] = useState("")
  const [isRunning, setIsRunning] = useState(false)

  const handleLanguageChange = (newLanguage: string) => {
    setLanguage(newLanguage)
    setCode(defaultCode[newLanguage as keyof typeof defaultCode] || "// Start coding here...")
    setOutput("")
  }

  const runCode = async () => {
    setIsRunning(true)
    setOutput("Running code...")
    
    // Simulate code execution
    setTimeout(() => {
      if (language === "javascript" || language === "typescript") {
        try {
          // This is a simplified execution - in a real app, you'd use a secure sandbox
          const result = eval(code.replace(/console\.log/g, 'output += '))
          setOutput("Code executed successfully!")
        } catch (error) {
          setOutput(`Error: ${error}`)
        }
      } else if (language === "python") {
        setOutput("Python execution would require a backend service")
      } else {
        setOutput(`${language} execution would require a backend service`)
      }
      setIsRunning(false)
    }, 1500)
  }

  const resetCode = () => {
    setCode(defaultCode[language as keyof typeof defaultCode] || "// Start coding here...")
    setOutput("")
  }

  return (
    <div className="h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
              Code Editor
            </h1>
            <div className="flex items-center space-x-2">
              <select
                value={language}
                onChange={(e) => handleLanguageChange(e.target.value)}
                className="px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
              >
                {languages.map((lang) => (
                  <option key={lang.value} value={lang.value}>
                    {lang.label}
                  </option>
                ))}
              </select>
              <select
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
                className="px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
              >
                {themes.map((t) => (
                  <option key={t.value} value={t.value}>
                    {t.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={runCode}
              disabled={isRunning}
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-700 disabled:bg-green-400 rounded-md transition-colors"
            >
              <Play className="h-4 w-4 mr-2" />
              {isRunning ? "Running..." : "Run"}
            </button>
            <button
              onClick={resetCode}
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-md transition-colors"
            >
              <RotateCcw className="h-4 w-4 mr-2" />
              Reset
            </button>
            <button className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-md transition-colors">
              <Share className="h-4 w-4 mr-2" />
              Share
            </button>
            <button className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-md transition-colors">
              <Download className="h-4 w-4 mr-2" />
              Save
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex">
        {/* Code Editor */}
        <div className="flex-1 flex flex-col">
          <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-2">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="ml-4 text-sm text-gray-600 dark:text-gray-400">
                main.{language === "python" ? "py" : language === "java" ? "java" : "js"}
              </span>
            </div>
          </div>
          
          <div className="flex-1">
            <Editor
              height="100%"
              language={language}
              theme={theme}
              value={code}
              onChange={(value) => setCode(value || "")}
              options={{
                fontSize: 14,
                minimap: { enabled: false },
                scrollBeyondLastLine: false,
                automaticLayout: true,
                tabSize: 2,
                wordWrap: "on",
                lineNumbers: "on",
                renderLineHighlight: "line",
                selectOnLineNumbers: true,
                matchBrackets: "always",
              }}
            />
          </div>
        </div>

        {/* Output Panel */}
        <div className="w-96 bg-white dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700 flex flex-col">
          <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center">
              <Terminal className="h-4 w-4 mr-2 text-gray-600 dark:text-gray-400" />
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                Output
              </span>
            </div>
          </div>
          
          <div className="flex-1 p-4">
            <div className="bg-gray-900 rounded-lg p-4 h-full overflow-auto">
              <pre className="text-green-400 text-sm font-mono">
                {output || "Click 'Run' to see output here..."}
              </pre>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 px-6 py-3">
        <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
          <div className="flex items-center space-x-4">
            <span>Language: {languages.find(l => l.value === language)?.label}</span>
            <span>Theme: {themes.find(t => t.value === theme)?.label}</span>
          </div>
          <div className="flex items-center space-x-4">
            <span>Line: 1, Column: 1</span>
            <button className="flex items-center hover:text-gray-900 dark:hover:text-white">
              <Settings className="h-4 w-4 mr-1" />
              Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
