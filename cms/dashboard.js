const dashboard = {
  widgets: [
    {
      name: 'project-users',
      layout: { width: 'auto' },
    },
    {
      name: 'document-list',
      layout: { width: 'auto' },
      options: {
        title: 'Last updates',
        order: '_updatedAt desc',
        limit: 10,
        showCreateButton: false,
      },
    },
  ],
}

export default dashboard
