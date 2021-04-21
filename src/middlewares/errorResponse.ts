import { DefaultContext } from 'koa'

const errorMethods = (ctx: DefaultContext, next: any) => {
	const codeMap: any = {
		badRequest: {
			code: 400,
			message: { error: 'Bad request' }
		},
		unauthorized: {
			code: 401,
			message: { error: 'Not authorized' }
		},
		forbidden: {
			code: 403,
			message: { error: "User don't has sufficient privileges" }
		},
		notFound: {
			code: 404,
			message: { error: 'Not found' }
		},
		conflict: {
			code: 409,
			message: { error: 'Conflict' }
		}
	}

	for (const code in codeMap) {
		ctx[code] = (ctx: DefaultContext, message?: string) => {
			const body = message ? { error: message } : codeMap[code].message
			ctx.status = codeMap[code].code
			ctx.body = body
			return ctx
		}
	}

	return next()
}

export default () => errorMethods
