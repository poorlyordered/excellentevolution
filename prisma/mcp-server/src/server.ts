// prisma/mcp-server/src/server.ts
import { MCPServer, defineTool } from '@mcp-js/server';
import { z } from 'zod';
import { prisma } from './prismaClient'; // Assuming prisma client instance is exported from here

// --- Tool Input Schemas ---

const CreateOrUpdateDevelopmentPlanInput = z.object({
  userId: z.string().uuid(),
  planId: z.string().uuid().optional(), // Optional: Provide ID to update an existing plan
  title: z.string().optional(),
  content: z.string(),
});

const GetDevelopmentPlansInput = z.object({
  userId: z.string().uuid(),
});

// --- Tool Definitions ---

const createOrUpdateDevelopmentPlan = defineTool({
  name: 'createOrUpdateDevelopmentPlan',
  description: 'Creates a new development plan or updates an existing one for a user.',
  input: CreateOrUpdateDevelopmentPlanInput,
  handler: async (input) => {
    try {
      const { userId, planId, title, content } = input;

      if (planId) {
        // Update existing plan
        const updatedPlan = await prisma.developmentPlan.update({
          where: { id: planId, userId: userId }, // Ensure user owns the plan
          data: {
            title: title,
            content: content,
          },
        });
        return { success: true, plan: updatedPlan };
      } else {
        // Create new plan
        const newPlan = await prisma.developmentPlan.create({
          data: {
            userId: userId,
            title: title,
            content: content,
          },
        });
        return { success: true, plan: newPlan };
      }
    } catch (error: any) {
      console.error("Error in createOrUpdateDevelopmentPlan:", error);
      return { success: false, error: error.message || 'Failed to save development plan.' };
    }
  },
});

const getDevelopmentPlansByUserId = defineTool({
  name: 'getDevelopmentPlansByUserId',
  description: 'Retrieves all development plans for a specific user.',
  input: GetDevelopmentPlansInput,
  handler: async (input) => {
    try {
      const { userId } = input;
      const plans = await prisma.developmentPlan.findMany({
        where: { userId: userId },
        orderBy: { createdAt: 'desc' }, // Optional: order by creation date
      });
      return { success: true, plans: plans };
    } catch (error: any) {
      console.error("Error in getDevelopmentPlansByUserId:", error);
      return { success: false, error: error.message || 'Failed to retrieve development plans.' };
    }
  },
});


// --- Server Initialization ---

async function main() {
  const server = new MCPServer({
    name: 'prisma-db-server', // Choose a name for this server
    description: 'MCP Server for interacting with the Prisma ORM and MariaDB database.',
    tools: [
      createOrUpdateDevelopmentPlan,
      getDevelopmentPlansByUserId,
      // TODO: Add other tools like execute_query, get_tables etc. later if needed
    ],
  });

  // Start the server (listens on stdio by default)
  await server.listen();
  console.log('MCP Prisma DB Server started.');
}

main().catch((err) => {
  console.error('MCP Server failed to start:', err);
  process.exit(1);
});