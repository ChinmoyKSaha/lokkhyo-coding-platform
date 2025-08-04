'use client'
import { useState } from 'react'
import { useParams } from 'next/navigation'
import { Editor } from '@monaco-editor/react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Clock, 
  Play, 
  CheckCircle, 
  BookOpen, 
  Code, 
  Users, 
  Star,
  Download,
  ExternalLink,
  ChevronRight,
  Target,
  Lightbulb
} from 'lucide-react'

interface ProjectStep {
  step: number
  title: string
  description: string
  code: string
}

interface Project {
  id: number
  title: string
  description: string
  difficulty: string
  duration: string
  estimatedTime: string
  technologies: string[]
  requirements: string[]
  features: string[]
  steps: ProjectStep[]
}

const projects: Record<number, Project> = {
  1: {
    id: 1,
    title: "Build a To-Do List App",
    description: "Create a fully functional to-do list application with add, edit, delete, and filter functionality using React and localStorage.",
    difficulty: "Beginner",
    duration: "2-3 hours",
    estimatedTime: "3 hours",
    technologies: ["React", "JavaScript", "CSS", "localStorage"],
    requirements: [
      "Basic knowledge of HTML/CSS",
      "Understanding of JavaScript fundamentals",
      "React basics (components, state, props)",
      "Familiarity with ES6+ syntax"
    ],
    features: [
      "Add new tasks with enter key support",
      "Mark tasks as complete/incomplete",
      "Edit existing tasks with double-click", 
      "Delete tasks with confirmation",
      "Filter tasks (all, active, completed)",
      "Persist data with localStorage",
      "Responsive design for mobile devices",
      "Task counter and progress tracking"
    ],
    steps: [
      {
        step: 1,
        title: "Project Setup & Structure",
        description: "Initialize the React project and create the basic component structure",
        code: `# Create a new React app
npx create-react-app todo-app
cd todo-app

# Install additional dependencies (optional)
npm install uuid classnames

# Start the development server
npm start

# Project structure
src/
  components/
    TodoList.js
    TodoItem.js
    TodoForm.js
    FilterButtons.js
  hooks/
    useLocalStorage.js
  App.js
  App.css
  index.js`
      },
      {
        step: 2,
        title: "Create the Main App Component",
        description: "Set up the main App component with state management and localStorage integration",
        code: `// src/App.js
import React, { useState, useEffect } from 'react';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import FilterButtons from './components/FilterButtons';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState('all');

  // Load todos from localStorage on component mount
  useEffect(() => {
    try {
      const savedTodos = localStorage.getItem('todos');
      if (savedTodos) {
        setTodos(JSON.parse(savedTodos));
      }
    } catch (error) {
      console.error('Error loading todos from localStorage:', error);
    }
  }, []);

  // Save todos to localStorage whenever todos change
  useEffect(() => {
    try {
      localStorage.setItem('todos', JSON.stringify(todos));
    } catch (error) {
      console.error('Error saving todos to localStorage:', error);
    }
  }, [todos]);

  const addTodo = (text) => {
    if (text.trim() !== '') {
      const newTodo = {
        id: Date.now().toString(),
        text: text.trim(),
        completed: false,
        createdAt: new Date().toISOString()
      };
      setTodos(prevTodos => [...prevTodos, newTodo]);
    }
  };

  const toggleTodo = (id) => {
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
    }
  };

  const editTodo = (id, newText) => {
    if (newText.trim() !== '') {
      setTodos(prevTodos =>
        prevTodos.map(todo =>
          todo.id === id ? { ...todo, text: newText.trim() } : todo
        )
      );
    }
  };

  const filteredTodos = todos.filter(todo => {
    switch (filter) {
      case 'active':
        return !todo.completed;
      case 'completed':
        return todo.completed;
      default:
        return true;
    }
  });

  const completedCount = todos.filter(todo => todo.completed).length;
  const totalCount = todos.length;

  return (
    <div className="app">
      <header className="app-header">
        <h1>Todo App</h1>
        <p>{completedCount} of {totalCount} tasks completed</p>
      </header>
      
      <main className="app-main">
        <TodoForm onAddTodo={addTodo} />
        <FilterButtons
          currentFilter={filter}
          onFilterChange={setFilter}
          todoCounts={{
            all: totalCount,
            active: totalCount - completedCount,
            completed: completedCount
          }}
        />
        <TodoList
          todos={filteredTodos}
          onToggleTodo={toggleTodo}
          onDeleteTodo={deleteTodo}
          onEditTodo={editTodo}
        />
      </main>
    </div>
  );
}

export default App;`
      },
      {
        step: 3,
        title: "Create the TodoForm Component",
        description: "Build the form component for adding new todos with input validation",
        code: `// src/components/TodoForm.js
import React, { useState } from 'react';

function TodoForm({ onAddTodo }) {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onAddTodo(inputValue);
      setInputValue('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <div className="input-container">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Add a new task..."
          className="todo-input"
          maxLength={200}
        />
        <button
          type="submit"
          className="add-button"
          disabled={!inputValue.trim()}
        >
          Add Task
        </button>
      </div>
      {inputValue.length > 150 && (
        <small className="character-count">
          {200 - inputValue.length} characters remaining
        </small>
      )}
    </form>
  );
}

export default TodoForm;`
      },
      {
        step: 4,
        title: "Create the TodoList and TodoItem Components",
        description: "Build the list display and individual todo item components with editing functionality",
        code: `// src/components/TodoList.js
import React from 'react';
import TodoItem from './TodoItem';

function TodoList({ todos, onToggleTodo, onDeleteTodo, onEditTodo }) {
  if (todos.length === 0) {
    return (
      <div className="empty-state">
        <h3>No tasks yet</h3>
        <p>Add your first task above to get started!</p>
      </div>
    );
  }

  return (
    <ul className="todo-list">
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={() => onToggleTodo(todo.id)}
          onDelete={() => onDeleteTodo(todo.id)}
          onEdit={(newText) => onEditTodo(todo.id, newText)}
        />
      ))}
    </ul>
  );
}

export default TodoList;

// src/components/TodoItem.js
import React, { useState } from 'react';

function TodoItem({ todo, onToggle, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const handleEdit = () => {
    setIsEditing(true);
    setEditText(todo.text);
  };

  const handleSave = () => {
    onEdit(editText);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditText(todo.text);
    setIsEditing(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  return (
    <li className={\`todo-item \${todo.completed ? 'completed' : ''}\`}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={onToggle}
        className="todo-checkbox"
      />
      
      {isEditing ? (
        <div className="edit-container">
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onKeyPress={handleKeyPress}
            onBlur={handleSave}
            className="edit-input"
            autoFocus
          />
          <div className="edit-buttons">
            <button onClick={handleSave} className="save-btn">
              Save
            </button>
            <button onClick={handleCancel} className="cancel-btn">
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="todo-content">
          <span
            className="todo-text"
            onDoubleClick={handleEdit}
            title="Double-click to edit"
          >
            {todo.text}
          </span>
          <div className="todo-actions">
            <button onClick={handleEdit} className="edit-btn">
              Edit
            </button>
            <button onClick={onDelete} className="delete-btn">
              Delete
            </button>
          </div>
        </div>
      )}
    </li>
  );
}

export default TodoItem;`
      },
      {
        step: 5,
        title: "Add Filter Functionality",
        description: "Create filter buttons to show all, active, or completed tasks",
        code: `// src/components/FilterButtons.js
import React from 'react';

function FilterButtons({ currentFilter, onFilterChange, todoCounts }) {
  const filters = [
    { key: 'all', label: 'All', count: todoCounts.all },
    { key: 'active', label: 'Active', count: todoCounts.active },
    { key: 'completed', label: 'Completed', count: todoCounts.completed }
  ];

  return (
    <div className="filter-container">
      <div className="filter-buttons">
        {filters.map(filter => (
          <button
            key={filter.key}
            onClick={() => onFilterChange(filter.key)}
            className={\`filter-btn \${currentFilter === filter.key ? 'active' : ''}\`}
          >
            {filter.label}
            <span className="count-badge">{filter.count}</span>
          </button>
        ))}
      </div>
      
      {todoCounts.completed > 0 && (
        <div className="progress-bar">
          <div 
            className="progress-fill"
            style={{
              width: \`\${(todoCounts.completed / todoCounts.all) * 100}%\`
            }}
          />
        </div>
      )}
    </div>
  );
}

export default FilterButtons;`
      },
      {
        step: 6,
        title: "Add CSS Styling",
        description: "Style the application with CSS for a modern, responsive design",
        code: `/* src/App.css */
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
  color: #333;
}

.app {
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem 1rem;
  min-height: 100vh;
}

.app-header {
  text-align: center;
  margin-bottom: 2rem;
  color: white;
}

.app-header h1 {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
  text-shadow: 0 2px 4px rgba(0,0,0,0.3);
}

.app-header p {
  font-size: 1.1rem;
  opacity: 0.9;
}

.app-main {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 8px 32px rgba(0,0,0,0.1);
}

/* Todo Form Styles */
.todo-form {
  margin-bottom: 2rem;
}

.input-container {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.todo-input {
  flex: 1;
  padding: 0.75rem;
  border: 2px solid #e1e5e9;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.2s;
}

.todo-input:focus {
  outline: none;
  border-color: #667eea;
}

.add-button {
  padding: 0.75rem 1.5rem;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}

.add-button:hover:not(:disabled) {
  background: #5a6fd8;
}

.add-button:disabled {
  background: #ccc;
  cursor: not-allowed;
}

.character-count {
  color: #666;
  font-size: 0.875rem;
}

/* Filter Styles */
.filter-container {
  margin-bottom: 1.5rem;
}

.filter-buttons {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.filter-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border: 2px solid #e1e5e9;
  background: white;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
}

.filter-btn:hover {
  border-color: #667eea;
}

.filter-btn.active {
  background: #667eea;
  color: white;
  border-color: #667eea;
}

.count-badge {
  background: rgba(0,0,0,0.1);
  padding: 0.2rem 0.5rem;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 600;
}

.filter-btn.active .count-badge {
  background: rgba(255,255,255,0.2);
}

.progress-bar {
  height: 8px;
  background: #e1e5e9;
  border-radius: 4px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: #667eea;
  transition: width 0.3s ease;
}

/* Todo List Styles */
.todo-list {
  list-style: none;
}

.todo-item {
  display: flex;
  align-items: center;
  padding: 1rem;
  border: 1px solid #e1e5e9;
  border-radius: 8px;
  margin-bottom: 0.5rem;
  background: white;
  transition: all 0.2s;
}

.todo-item:hover {
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.todo-item.completed {
  opacity: 0.7;
  background: #f8f9fa;
}

.todo-checkbox {
  margin-right: 1rem;
  width: 1.2rem;
  height: 1.2rem;
  cursor: pointer;
}

.todo-content {
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.todo-text {
  flex: 1;
  cursor: pointer;
  user-select: none;
}

.todo-item.completed .todo-text {
  text-decoration: line-through;
  color: #666;
}

.todo-actions {
  display: flex;
  gap: 0.5rem;
}

.edit-btn, .delete-btn, .save-btn, .cancel-btn {
  padding: 0.25rem 0.75rem;
  border: 1px solid;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.875rem;
  transition: all 0.2s;
}

.edit-btn {
  border-color: #667eea;
  color: #667eea;
  background: white;
}

.edit-btn:hover {
  background: #667eea;
  color: white;
}

.delete-btn {
  border-color: #dc3545;
  color: #dc3545;
  background: white;
}

.delete-btn:hover {
  background: #dc3545;
  color: white;
}

.save-btn {
  border-color: #28a745;
  color: #28a745;
  background: white;
}

.save-btn:hover {
  background: #28a745;
  color: white;
}

.cancel-btn {
  border-color: #6c757d;
  color: #6c757d;
  background: white;
}

.cancel-btn:hover {
  background: #6c757d;
  color: white;
}

/* Edit Mode Styles */
.edit-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.edit-input {
  padding: 0.5rem;
  border: 2px solid #667eea;
  border-radius: 4px;
  font-size: 1rem;
}

.edit-buttons {
  display: flex;
  gap: 0.5rem;
}

/* Empty State */
.empty-state {
  text-align: center;
  padding: 3rem 1rem;
  color: #666;
}

.empty-state h3 {
  margin-bottom: 0.5rem;
  font-size: 1.5rem;
}

/* Responsive Design */
@media (max-width: 768px) {
  .app {
    padding: 1rem 0.5rem;
  }
  
  .app-main {
    padding: 1.5rem;
  }
  
  .filter-buttons {
    flex-direction: column;
  }
  
  .todo-content {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
  
  .todo-actions {
    align-self: flex-end;
  }
}`
      }
    ]
  }
}

export default function ProjectTutorialPage() {
  const params = useParams()
  const projectId = parseInt(params.id as string)
  const project = projects[projectId]
  
  const [currentStep, setCurrentStep] = useState(1)
  const [completedSteps, setCompletedSteps] = useState<number[]>([])

  if (!project) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Project not found</h1>
        </div>
      </div>
    )
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'beginner': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
      case 'intermediate': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
      case 'advanced': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300'
    }
  }

  const markStepComplete = (stepNumber: number) => {
    if (!completedSteps.includes(stepNumber)) {
      setCompletedSteps([...completedSteps, stepNumber])
    }
  }

  const progressPercentage = (completedSteps.length / project.steps.length) * 100

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-4">
                <Badge className={getDifficultyColor(project.difficulty)}>
                  {project.difficulty}
                </Badge>
                <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
                  <Clock className="h-4 w-4" />
                  <span>{project.estimatedTime}</span>
                </div>
              </div>
              
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                {project.title}
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl">
                {project.description}
              </p>
              
              <div className="flex flex-wrap gap-2 mt-4">
                {project.technologies.map((tech) => (
                  <Badge key={tech} variant="outline" className="text-xs">
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>
            
            <div className="mt-6 lg:mt-0 lg:ml-8">
              <div className="flex flex-col gap-3">
                <Button size="lg">
                  <Play className="h-4 w-4 mr-2" />
                  Start Project
                </Button>
                <Button variant="outline" size="lg">
                  <Download className="h-4 w-4 mr-2" />
                  Download Starter
                </Button>
              </div>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="mt-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Progress: {completedSteps.length} of {project.steps.length} steps completed
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {Math.round(progressPercentage)}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="space-y-6">
              {/* Project Overview */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5" />
                    What You'll Build
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    {project.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Requirements */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lightbulb className="h-5 w-5" />
                    Prerequisites
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    {project.requirements.map((req, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <ChevronRight className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Step Navigation */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5" />
                    Tutorial Steps
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <nav className="space-y-2">
                    {project.steps.map((step) => (
                      <button
                        key={step.step}
                        onClick={() => setCurrentStep(step.step)}
                        className={`w-full text-left p-3 rounded-lg transition-colors ${
                          currentStep === step.step
                            ? 'bg-blue-100 text-blue-900 dark:bg-blue-900 dark:text-blue-100'
                            : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                            completedSteps.includes(step.step)
                              ? 'bg-green-500 text-white'
                              : currentStep === step.step
                              ? 'bg-blue-500 text-white'
                              : 'bg-gray-300 text-gray-600'
                          }`}>
                            {completedSteps.includes(step.step) ? '✓' : step.step}
                          </div>
                          <span className="text-sm font-medium">{step.title}</span>
                        </div>
                      </button>
                    ))}
                  </nav>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <span className="text-blue-600">Step {currentStep}</span>
                      <span>{project.steps.find(s => s.step === currentStep)?.title}</span>
                    </CardTitle>
                    <CardDescription className="mt-2">
                      {project.steps.find(s => s.step === currentStep)?.description}
                    </CardDescription>
                  </div>
                  <Button
                    onClick={() => markStepComplete(currentStep)}
                    disabled={completedSteps.includes(currentStep)}
                    variant={completedSteps.includes(currentStep) ? "outline" : "default"}
                  >
                    {completedSteps.includes(currentStep) ? (
                      <>
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Completed
                      </>
                    ) : (
                      'Mark Complete'
                    )}
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="code" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="code">Code</TabsTrigger>
                    <TabsTrigger value="preview">Preview</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="code" className="mt-4">
                    <div className="border rounded-lg overflow-hidden">
                      <Editor
                        height="500px"
                        language="javascript"
                        theme="vs-dark"
                        value={project.steps.find(s => s.step === currentStep)?.code || ''}
                        options={{
                          readOnly: true,
                          minimap: { enabled: false },
                          fontSize: 14,
                          lineNumbers: 'on',
                          wordWrap: 'on',
                          scrollBeyondLastLine: false,
                        }}
                      />
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="preview" className="mt-4">
                    <div className="border rounded-lg p-8 bg-gray-50 dark:bg-gray-800 text-center">
                      <div className="text-gray-500 dark:text-gray-400">
                        <ExternalLink className="h-12 w-12 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold mb-2">Live Preview</h3>
                        <p>Run this code in your local environment to see the preview</p>
                        <Button className="mt-4" variant="outline">
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Open in CodeSandbox
                        </Button>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>

                <div className="flex items-center justify-between mt-6">
                  <Button
                    variant="outline"
                    onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                    disabled={currentStep === 1}
                  >
                    Previous Step
                  </Button>
                  <Button
                    onClick={() => setCurrentStep(Math.min(project.steps.length, currentStep + 1))}
                    disabled={currentStep === project.steps.length}
                  >
                    Next Step
                    <ChevronRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
