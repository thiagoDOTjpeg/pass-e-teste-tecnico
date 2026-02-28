import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
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
* @see \App\Http\Controllers\TodoController::destroy
* @see app/Http/Controllers/TodoController.php:13
* @route '/api/todos/{id}'
*/
const destroy00bc4df2b28f3e9c61808d5cc0f00224 = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy00bc4df2b28f3e9c61808d5cc0f00224.url(args, options),
    method: 'delete',
})

destroy00bc4df2b28f3e9c61808d5cc0f00224.definition = {
    methods: ["delete"],
    url: '/api/todos/{id}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\TodoController::destroy
* @see app/Http/Controllers/TodoController.php:13
* @route '/api/todos/{id}'
*/
destroy00bc4df2b28f3e9c61808d5cc0f00224.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { id: args }
    }

    if (Array.isArray(args)) {
        args = {
            id: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        id: args.id,
    }

    return destroy00bc4df2b28f3e9c61808d5cc0f00224.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\TodoController::destroy
* @see app/Http/Controllers/TodoController.php:13
* @route '/api/todos/{id}'
*/
destroy00bc4df2b28f3e9c61808d5cc0f00224.delete = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy00bc4df2b28f3e9c61808d5cc0f00224.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\TodoController::destroy
* @see app/Http/Controllers/TodoController.php:13
* @route '/api/todos/{id}'
*/
const destroy00bc4df2b28f3e9c61808d5cc0f00224Form = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy00bc4df2b28f3e9c61808d5cc0f00224.url(args, {
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
* @route '/api/todos/{id}'
*/
destroy00bc4df2b28f3e9c61808d5cc0f00224Form.delete = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy00bc4df2b28f3e9c61808d5cc0f00224.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroy00bc4df2b28f3e9c61808d5cc0f00224.form = destroy00bc4df2b28f3e9c61808d5cc0f00224Form
/**
* @see \App\Http\Controllers\TodoController::destroy
* @see app/Http/Controllers/TodoController.php:13
* @route '/api/todos/{todo}'
*/
const destroy5494ccd4639d709a242e083b3519923b = (args: { todo: string | number } | [todo: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy5494ccd4639d709a242e083b3519923b.url(args, options),
    method: 'delete',
})

destroy5494ccd4639d709a242e083b3519923b.definition = {
    methods: ["delete"],
    url: '/api/todos/{todo}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\TodoController::destroy
* @see app/Http/Controllers/TodoController.php:13
* @route '/api/todos/{todo}'
*/
destroy5494ccd4639d709a242e083b3519923b.url = (args: { todo: string | number } | [todo: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return destroy5494ccd4639d709a242e083b3519923b.definition.url
            .replace('{todo}', parsedArgs.todo.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\TodoController::destroy
* @see app/Http/Controllers/TodoController.php:13
* @route '/api/todos/{todo}'
*/
destroy5494ccd4639d709a242e083b3519923b.delete = (args: { todo: string | number } | [todo: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy5494ccd4639d709a242e083b3519923b.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\TodoController::destroy
* @see app/Http/Controllers/TodoController.php:13
* @route '/api/todos/{todo}'
*/
const destroy5494ccd4639d709a242e083b3519923bForm = (args: { todo: string | number } | [todo: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy5494ccd4639d709a242e083b3519923b.url(args, {
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
destroy5494ccd4639d709a242e083b3519923bForm.delete = (args: { todo: string | number } | [todo: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy5494ccd4639d709a242e083b3519923b.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroy5494ccd4639d709a242e083b3519923b.form = destroy5494ccd4639d709a242e083b3519923bForm

export const destroy = {
    '/api/todos/{id}': destroy00bc4df2b28f3e9c61808d5cc0f00224,
    '/api/todos/{todo}': destroy5494ccd4639d709a242e083b3519923b,
}

/**
* @see \App\Http\Controllers\TodoController::show
* @see app/Http/Controllers/TodoController.php:21
* @route '/api/todos/{id}'
*/
const show00bc4df2b28f3e9c61808d5cc0f00224 = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show00bc4df2b28f3e9c61808d5cc0f00224.url(args, options),
    method: 'get',
})

show00bc4df2b28f3e9c61808d5cc0f00224.definition = {
    methods: ["get","head"],
    url: '/api/todos/{id}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\TodoController::show
* @see app/Http/Controllers/TodoController.php:21
* @route '/api/todos/{id}'
*/
show00bc4df2b28f3e9c61808d5cc0f00224.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { id: args }
    }

    if (Array.isArray(args)) {
        args = {
            id: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        id: args.id,
    }

    return show00bc4df2b28f3e9c61808d5cc0f00224.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\TodoController::show
* @see app/Http/Controllers/TodoController.php:21
* @route '/api/todos/{id}'
*/
show00bc4df2b28f3e9c61808d5cc0f00224.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show00bc4df2b28f3e9c61808d5cc0f00224.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\TodoController::show
* @see app/Http/Controllers/TodoController.php:21
* @route '/api/todos/{id}'
*/
show00bc4df2b28f3e9c61808d5cc0f00224.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show00bc4df2b28f3e9c61808d5cc0f00224.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\TodoController::show
* @see app/Http/Controllers/TodoController.php:21
* @route '/api/todos/{id}'
*/
const show00bc4df2b28f3e9c61808d5cc0f00224Form = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show00bc4df2b28f3e9c61808d5cc0f00224.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\TodoController::show
* @see app/Http/Controllers/TodoController.php:21
* @route '/api/todos/{id}'
*/
show00bc4df2b28f3e9c61808d5cc0f00224Form.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show00bc4df2b28f3e9c61808d5cc0f00224.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\TodoController::show
* @see app/Http/Controllers/TodoController.php:21
* @route '/api/todos/{id}'
*/
show00bc4df2b28f3e9c61808d5cc0f00224Form.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show00bc4df2b28f3e9c61808d5cc0f00224.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

show00bc4df2b28f3e9c61808d5cc0f00224.form = show00bc4df2b28f3e9c61808d5cc0f00224Form
/**
* @see \App\Http\Controllers\TodoController::show
* @see app/Http/Controllers/TodoController.php:21
* @route '/api/todos/{todo}'
*/
const show5494ccd4639d709a242e083b3519923b = (args: { todo: string | number } | [todo: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show5494ccd4639d709a242e083b3519923b.url(args, options),
    method: 'get',
})

show5494ccd4639d709a242e083b3519923b.definition = {
    methods: ["get","head"],
    url: '/api/todos/{todo}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\TodoController::show
* @see app/Http/Controllers/TodoController.php:21
* @route '/api/todos/{todo}'
*/
show5494ccd4639d709a242e083b3519923b.url = (args: { todo: string | number } | [todo: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return show5494ccd4639d709a242e083b3519923b.definition.url
            .replace('{todo}', parsedArgs.todo.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\TodoController::show
* @see app/Http/Controllers/TodoController.php:21
* @route '/api/todos/{todo}'
*/
show5494ccd4639d709a242e083b3519923b.get = (args: { todo: string | number } | [todo: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show5494ccd4639d709a242e083b3519923b.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\TodoController::show
* @see app/Http/Controllers/TodoController.php:21
* @route '/api/todos/{todo}'
*/
show5494ccd4639d709a242e083b3519923b.head = (args: { todo: string | number } | [todo: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show5494ccd4639d709a242e083b3519923b.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\TodoController::show
* @see app/Http/Controllers/TodoController.php:21
* @route '/api/todos/{todo}'
*/
const show5494ccd4639d709a242e083b3519923bForm = (args: { todo: string | number } | [todo: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show5494ccd4639d709a242e083b3519923b.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\TodoController::show
* @see app/Http/Controllers/TodoController.php:21
* @route '/api/todos/{todo}'
*/
show5494ccd4639d709a242e083b3519923bForm.get = (args: { todo: string | number } | [todo: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show5494ccd4639d709a242e083b3519923b.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\TodoController::show
* @see app/Http/Controllers/TodoController.php:21
* @route '/api/todos/{todo}'
*/
show5494ccd4639d709a242e083b3519923bForm.head = (args: { todo: string | number } | [todo: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show5494ccd4639d709a242e083b3519923b.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

show5494ccd4639d709a242e083b3519923b.form = show5494ccd4639d709a242e083b3519923bForm

export const show = {
    '/api/todos/{id}': show00bc4df2b28f3e9c61808d5cc0f00224,
    '/api/todos/{todo}': show5494ccd4639d709a242e083b3519923b,
}

/**
* @see \App\Http\Controllers\TodoController::update
* @see app/Http/Controllers/TodoController.php:49
* @route '/api/todos/{id}'
*/
const update00bc4df2b28f3e9c61808d5cc0f00224 = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update00bc4df2b28f3e9c61808d5cc0f00224.url(args, options),
    method: 'put',
})

update00bc4df2b28f3e9c61808d5cc0f00224.definition = {
    methods: ["put"],
    url: '/api/todos/{id}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\TodoController::update
* @see app/Http/Controllers/TodoController.php:49
* @route '/api/todos/{id}'
*/
update00bc4df2b28f3e9c61808d5cc0f00224.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { id: args }
    }

    if (Array.isArray(args)) {
        args = {
            id: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        id: args.id,
    }

    return update00bc4df2b28f3e9c61808d5cc0f00224.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\TodoController::update
* @see app/Http/Controllers/TodoController.php:49
* @route '/api/todos/{id}'
*/
update00bc4df2b28f3e9c61808d5cc0f00224.put = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update00bc4df2b28f3e9c61808d5cc0f00224.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\TodoController::update
* @see app/Http/Controllers/TodoController.php:49
* @route '/api/todos/{id}'
*/
const update00bc4df2b28f3e9c61808d5cc0f00224Form = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update00bc4df2b28f3e9c61808d5cc0f00224.url(args, {
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
* @route '/api/todos/{id}'
*/
update00bc4df2b28f3e9c61808d5cc0f00224Form.put = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update00bc4df2b28f3e9c61808d5cc0f00224.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

update00bc4df2b28f3e9c61808d5cc0f00224.form = update00bc4df2b28f3e9c61808d5cc0f00224Form
/**
* @see \App\Http\Controllers\TodoController::update
* @see app/Http/Controllers/TodoController.php:49
* @route '/api/todos/{todo}'
*/
const update5494ccd4639d709a242e083b3519923b = (args: { todo: string | number } | [todo: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update5494ccd4639d709a242e083b3519923b.url(args, options),
    method: 'put',
})

update5494ccd4639d709a242e083b3519923b.definition = {
    methods: ["put","patch"],
    url: '/api/todos/{todo}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\TodoController::update
* @see app/Http/Controllers/TodoController.php:49
* @route '/api/todos/{todo}'
*/
update5494ccd4639d709a242e083b3519923b.url = (args: { todo: string | number } | [todo: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return update5494ccd4639d709a242e083b3519923b.definition.url
            .replace('{todo}', parsedArgs.todo.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\TodoController::update
* @see app/Http/Controllers/TodoController.php:49
* @route '/api/todos/{todo}'
*/
update5494ccd4639d709a242e083b3519923b.put = (args: { todo: string | number } | [todo: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update5494ccd4639d709a242e083b3519923b.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\TodoController::update
* @see app/Http/Controllers/TodoController.php:49
* @route '/api/todos/{todo}'
*/
update5494ccd4639d709a242e083b3519923b.patch = (args: { todo: string | number } | [todo: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update5494ccd4639d709a242e083b3519923b.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\TodoController::update
* @see app/Http/Controllers/TodoController.php:49
* @route '/api/todos/{todo}'
*/
const update5494ccd4639d709a242e083b3519923bForm = (args: { todo: string | number } | [todo: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update5494ccd4639d709a242e083b3519923b.url(args, {
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
update5494ccd4639d709a242e083b3519923bForm.put = (args: { todo: string | number } | [todo: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update5494ccd4639d709a242e083b3519923b.url(args, {
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
update5494ccd4639d709a242e083b3519923bForm.patch = (args: { todo: string | number } | [todo: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update5494ccd4639d709a242e083b3519923b.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PATCH',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

update5494ccd4639d709a242e083b3519923b.form = update5494ccd4639d709a242e083b3519923bForm

export const update = {
    '/api/todos/{id}': update00bc4df2b28f3e9c61808d5cc0f00224,
    '/api/todos/{todo}': update5494ccd4639d709a242e083b3519923b,
}

const TodoController = { store, index, destroy, show, update }

export default TodoController