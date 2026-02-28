import TodoController from './TodoController'
import AuthController from './AuthController'

const Controllers = {
    TodoController: Object.assign(TodoController, TodoController),
    AuthController: Object.assign(AuthController, AuthController),
}

export default Controllers