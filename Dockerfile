# Use a lightweight Nginx image to serve the static files
FROM nginx:alpine

# Copy the portfolio files to Nginx's default public html directory
COPY . /usr/share/nginx/html

# Expose port 80 to the outside world
EXPOSE 80

# Start Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]
