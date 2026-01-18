import type { APIContext, AstroGlobal } from "astro";
import {
    HttpApi,
    HttpApiBuilder,
    HttpApiEndpoint,
    HttpApiGroup,
    HttpApiSwagger,
    HttpServer
} from "@effect/platform"
import { Context, Effect, Layer, Schema } from "effect"

class AstroLocals extends Context.Reference<AstroLocals>()("AstroLocals", {
    defaultValue: () => ({} as AstroGlobal['locals'])
}) { }

const api = HttpApi.make("myApi").add(
    HttpApiGroup.make("group").add(
        HttpApiEndpoint.get("get", "/").addSuccess(Schema.String)
    )
)

const groupLive = HttpApiBuilder.group(api, "group", (handlers) =>
    handlers.handle("get", () => Effect.gen(function* () {
        const locals = yield* AstroLocals;
        console.log("Astro Locals:", locals); // Log the locals to verify access
        return "Hello from Effect API!";
    }))
)

const MyApiLive = HttpApiBuilder.api(api).pipe(Layer.provide(groupLive))

const SwaggerLayer = HttpApiSwagger.layer().pipe(Layer.provide(MyApiLive))

// Convert the API to a web handler
const { dispose, handler } = HttpApiBuilder.toWebHandler(
    Layer.mergeAll(MyApiLive, SwaggerLayer, HttpServer.layerContext)
)

// Astro API endpoint that allows ANY valid route into the Effect handler
export const ALL = async ({ request, locals }: APIContext) => {
    locals.foo = "bar"; // Example of adding to locals
    const localsContext = Context.make(AstroLocals, locals);
    try {
        return await handler(request, localsContext);
    } catch (error) {
        console.error("Error handling request:", error);
        throw error;
    } finally {
        // Dispose resources if necessary
        dispose();
    }
}