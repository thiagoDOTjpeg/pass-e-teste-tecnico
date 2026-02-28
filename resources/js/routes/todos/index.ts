import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
/**
* @see \App\Http\Controllers\TodoController::store
* @see app/Http/Controllers/TodoController.php:28
* @route '/api/todos'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/api/todos',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\TodoController::store
* @see app/Http/Controllers/TodoController.php:28
* @route '/api/todos'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\TodoController::store
* @see app/Http/Controllers/TodoController.php:28
* @route '/api/todos'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\TodoController::store
* @see app/Http/Controllers/TodoController.php:28
* @route '/api/todos'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\TodoController::store
* @see app/Http/Controllers/TodoController.php:28
* @route '/api/todos'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

/**
* @see \App\Http\Controllers\TodoController::index
* @see app/Http/Controllers/TodoController.php:35
* @route '/api/todos'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/api/todos',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\TodoController::index
* @see app/Http/Controllers/TodoController.php:35
* @route '/api/todos'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\TodoController::index
* @see app/Http/Controllers/TodoController.php:35
* @route '/api/todos'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\TodoController::index
* @see app/Http/Controllers/TodoController.php:35
* @route '/api/todos'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\TodoController::index
* @see app/Http/Controllers/TodoController.php:35
* @route '/api/todos'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\TodoController::index
* @see app/Http/Controllers/TodoController.php:35
* @route '/api/todos'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\TodoController::index
* @see app/Http/Controllers/TodoController.php:35
* @route '/api/todos'
*/
indexForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

index.form = indexForm

/**
* @see \App\Http\Controllers\TodoController::show
* @see app/Http/Controllers/TodoController.php:21
* @route '/api/todos/{todo}'
*/
export const show = (args: { todo: string | number } | [todo: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/api/todos/{todo}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\TodoController::show
* @see app/Http/Controllers/TodoController.php:21
* @route '/api/todos/{todo}'
*/
show.url = (args: { todo: string | number } | [todo: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { todo: args }
    }

    if (Array.isArray(args)) {
        args = {
            todo: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        todo: args.todo,
    }

    return show.definition.url
            .replace('{todo}', parsedArgs.todo.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\TodoController::show
* @see app/Http/Controllers/TodoController.php:21
* @route '/api/todos/{todo}'
*/
show.get = (args: { todo: string | number } | [todo: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\TodoController::show
* @see app/Http/Controllers/TodoController.php:21
* @route '/api/todos/{todo}'
*/
show.head = (args: { todo: string | number } | [todo: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\TodoController::show
* @see app/Http/Controllers/TodoController.php:21
* @route '/api/todos/{todo}'
*/
const showForm = (args: { todo: string | number } | [todo: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\TodoController::show
* @see app/Http/Controllers/TodoController.php:21
* @route '/api/todos/{todo}'
*/
showForm.get = (args: { todo: string | number } | [todo: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\TodoController::show
* @see app/Http/Controllers/TodoController.php:21
* @route '/api/todos/{todo}'
*/
showForm.head = (args: { todo: string | number } | [todo: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

show.form = showForm

/**
* @see \App\Http\Controllers\TodoController::update
* @see app/Http/Controllers/TodoController.php:49
* @route '/api/todos/{todo}'
*/
export const update = (args: { todo: string | number } | [todo: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/api/todos/{todo}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\TodoController::update
* @see app/Http/Controllers/TodoController.php:49
* @route '/api/todos/{todo}'
*/
update.url = (args: { todo: string | number } | [todo: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { todo: args }
    }

    if (Array.isArray(args)) {
        args = {
            todo: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        todo: args.todo,
    }

    return update.definition.url
            .replace('{todo}', parsedArgs.todo.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\TodoController::update
* @see app/Http/Controllers/TodoController.php:49
* @route '/api/todos/{todo}'
*/
update.put = (args: { todo: string | number } | [todo: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\TodoController::update
* @see app/Http/Controllers/TodoController.php:49
* @route '/api/todos/{todo}'
*/
update.patch = (args: { todo: string | number } | [todo: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\TodoController::update
* @see app/Http/Controllers/TodoController.php:49
* @route '/api/todos/{todo}'
*/
const updateForm = (args: { todo: string | number } | [todo: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\TodoController::update
* @see app/Http/Controllers/TodoController.php:49
* @route '/api/todos/{todo}'
*/
updateForm.put = (args: { todo: string | number } | [todo: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\TodoController::update
* @see app/Http/Controllers/TodoController.php:49
* @route '/api/todos/{todo}'
*/
updateForm.patch = (args: { todo: string | number } | [todo: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PATCH',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

update.form = updateForm

/**
* @see \App\Http\Controllers\TodoController::destroy
* @see app/Http/Controllers/TodoController.php:13
* @route '/api/todos/{todo}'
*/
export const destroy = (args: { todo: string | number } | [todo: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/api/todos/{todo}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\TodoController::destroy
* @see app/Http/Controllers/TodoController.php:13
* @route '/api/todos/{todo}'
*/
destroy.url = (args: { todo: string | number } | [todo: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { todo: args }
    }

    if (Array.isArray(args)) {
        args = {
            todo: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        todo: args.todo,
    }

    return destroy.definition.url
            .replace('{todo}', parsedArgs.todo.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\TodoController::destroy
* @see app/Http/Controllers/TodoController.php:13
* @route '/api/todos/{todo}'
*/
destroy.delete = (args: { todo: string | number } | [todo: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\TodoController::destroy
* @see app/Http/Controllers/TodoController.php:13
* @route '/api/todos/{todo}'
*/
const destroyForm = (args: { todo: string | number } | [todo: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\TodoController::destroy
* @see app/Http/Controllers/TodoController.php:13
* @route '/api/todos/{todo}'
*/
destroyForm.delete = (args: { todo: string | number } | [todo: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroy.form = destroyForm

const todos = {
    store: Object.assign(store, store),
    index: Object.assign(index, index),
    show: Object.assign(show, show),
    update: Object.assign(update, update),
    destroy: Object.assign(destroy, destroy),
}

export default todos