// '@/utils/amplify-utils.ts'
import { cookies } from "next/headers";
import { createServerRunner } from "@aws-amplify/adapter-nextjs";
import { generateServerClientUsingCookies } from "@aws-amplify/adapter-nextjs/api";
import { getCurrentUser } from "aws-amplify/auth/server";
import { type Schema } from "@/amplify/data/resource";
import config from "@/amplifyconfiguration.json";

// Create a server runner instance from Amplify with the provided configuration.
// This server runner will allow invoking Amplify functions in a server context, keeping each request isolated.
export const { runWithAmplifyServerContext } = createServerRunner({
  config,
});

// Generate a server client that can use cookies to manage and authenticate API requests.
// This client will automatically handle cookie management for Amplify API calls.
export const cookiesClient = generateServerClientUsingCookies<Schema>({
  config,
  cookies,
});

// Define an asynchronous function to retrieve the current authenticated user.
// This function uses the Amplify server context to ensure the authentication state is correctly managed.
export async function AuthGetCurrentUserServer() {
  try {
    // Run an operation within the Amplify server context to fetch the current user.
    // The operation leverages the provided cookies to maintain session consistency.
    const currentUser = await runWithAmplifyServerContext({
      nextServerContext: { cookies },
      operation: (contextSpec) => getCurrentUser(contextSpec),
    });

    // Return the current user information if successfully retrieved.
    return currentUser;
  } catch (error) {
    // Log and return error information if there's an issue fetching the current user.
    console.error(error);
  }
}
