export interface FileItem {
    id: string;
    name: string;
    type: 'file' | 'folder';
    url?: string;
    children?: FileItem[];
}

export const mockData: FileItem[] = [
    {
        id: '1',
        name: 'Documents',
        type: 'folder',
        children: [
            { id: '2', name: 'Resume.pdf', type: 'file', url: '/files/resume.pdf' },
            { id: '3', name: 'Project.docx', type: 'file', url: '/files/project.docx' },
        ],
    },
    {
        id: '4',
        name: 'Photos',
        type: 'folder',
        children: [
            { id: '5', name: 'Vacation.png', type: 'file', url: '/files/vacation.png' },
        ],
    },
    { id: '6', name: 'Todo.txt', type: 'file', url: '/files/todo.txt' },
];
