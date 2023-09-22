#!/usr/bin/env ts-node

import { program } from 'commander';
import { spawn } from 'child_process';
import { exec } from 'shelljs';
import chalk from 'chalk';

program
	.command('create <projectType> <projectName>')
	.description('Create a Next.js or React Native project with folders')
	.action((projectType: string, projectName: string) => {
		console.log(chalk.green(`Creating a ${projectType} project named ${projectName}...`));

		let createCommand = '';

		switch (projectType.toLowerCase()) {
			case 'next':
				createCommand = 'npx create-next-app';
				break;
			case 'react-native':
				createCommand = 'npx react-native init';
				break;
			default:
				console.error(chalk.red('Invalid project type. Use "next" or "react-native".'));
				process.exit(1);
		}

		// Run the appropriate project creation command interactively
		const createProjectProcess = spawn(createCommand, [projectName], {
			stdio: 'inherit',
		});

		createProjectProcess.on('close', (code) => {
			if (code === 0) {
				// Create additional folders and files as needed
				exec(`mkdir -p ${projectName}/components`);
				exec(`mkdir -p ${projectName}/hooks`);
				exec(`mkdir -p ${projectName}/routes`);
				exec(`touch  ${projectName}/routes/index.ts`);

				console.log(chalk.green('Project setup complete!'));
			} else {
				console.error(chalk.red('Project creation failed.'));
			}
		});
	});

program.parse(process.argv);
