Project Name is a message queue project that allows you to store and process
messages asynchronously.

## Installation

To clone the repo, run the following command in your terminal:

\`\`\` git clone https://github.com/username/project-name.git \`\`\`

## Usage

1. Build the Docker image by running the following command in the terminal:

\`\`\` docker build . -t username/appname \`\`\`

2. Run the Docker container with the following command:

\`\`\` docker run -p 8080:8080 -p 8081:8081 -d username/appname \`\`\`

The message queue is now up and running on port 8080. You can access the API
using a REST client or by sending requests directly to the endpoint. As this
queue uses redis for publishing and subscribing, make sure the redis server is
up and running.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to
discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)`;
