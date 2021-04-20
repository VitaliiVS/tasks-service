import { DefaultContext } from 'koa'

const errorMethods = (ctx: DefaultContext, next: any) => {
	const codeMap: any = {
		badRequest: 400,
		unauthorized: 401,
		forbidden: 403,
		notFound: 404,
		conflict: 409
	}

	for (const code in codeMap) {
		ctx[code] = (ctx: DefaultContext, message: string) => {
			ctx.status = codeMap[code]
			ctx.body = { error: message }
			return ctx
		}
	}

	return next()
}

export default () => errorMethods
