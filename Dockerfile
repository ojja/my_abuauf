FROM node:18.14.2

WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Update npm to the latest version
RUN npm install -g npm@9.6.5
RUN npm install remix -g
RUN npm install --force && npm install -g remix json-server tailwindcss concurrently@8.0.1
RUN npm install -g remix-esbuild-override
RUN npm install -g cross-env
RUN npm install -g rtlcss
RUN npm install -g @remix-run/serve

# Copy the entire project to the working directory
COPY . .

# Build the Remix project
RUN npm run build

# Expose the port on which the Remix server will listen
EXPOSE 3000
ENV NODE_ENV=production

# Start the Remix server
CMD ["npm", "run", "start"]