import commands from '@/src/commands.json';

export const isValidCommand = (command: string) => {
  const allAvailableCommands = Array.from(commands).map((com) => com.text);
  return allAvailableCommands.includes(command);
};
