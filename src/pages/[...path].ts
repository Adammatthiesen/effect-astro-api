import type { APIContext } from "astro";
import {
    HttpApi,
    HttpApiBuilder,
    HttpApiEndpoint,
    HttpApiGroup,
    HttpApiSwagger,
    HttpServer
} from "@effect/platform"
import { Effect, Layer, Schema } from "effect"

const api = HttpApi.make("myApi").add(
    HttpApiGroup.make("group").add(
        HttpApiEndpoint.get("get", "/").addSuccess(Schema.String)
    )
)

const groupLive = HttpApiBuilder.group(api, "group", (handlers) =>
    handlers.handle("get", () => Effect.succeed("Hello, world!"))
)

const MyApiLive = HttpApiBuilder.api(api).pipe(Layer.provide(groupLive))

const SwaggerLayer = HttpApiSwagger.layer().pipe(Layer.provide(MyApiLive))

// Convert the API to a web handler
const { dispose, handler } = HttpApiBuilder.toWebHandler(
    Layer.mergeAll(MyApiLive, SwaggerLayer, HttpServer.layerContext)
)

// Astro API endpoint that allows ANY valid route into the Effect handler
export const ALL = async ({ request }: APIContext) => {
    try {
        return await handler(request);
    } catch (error) {
        console.error("Error handling request:", error);
        throw error;
    } finally {
        // Dispose resources if necessary
        dispose();
    }
}