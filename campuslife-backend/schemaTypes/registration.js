export default {
    name: 'registration',
    title: 'Event Registrations',
    type: 'document',
    fields: [
      {
        name: 'event',
        title: 'Event',
        type: 'reference',
        to: [{ type: 'event' }],
        validation: Rule => Rule.required()
      },
      {
        name: 'studentName',
        title: 'Student Name',
        type: 'string',
        validation: Rule => Rule.required()
      },
      {
        name: 'email',
        title: 'Email',
        type: 'string',
        validation: Rule => Rule.required().email()
      },
      {
        name: 'registrationNumber',
        title: 'Registration Number',
        type: 'string',
        validation: Rule => Rule.required()
      },
      {
        name: 'department',
        title: 'Department',
        type: 'string',
        validation: Rule => Rule.required()
      },
      {
        name: 'phoneNumber',
        title: 'Phone Number',
        type: 'string',
        validation: Rule => Rule.required()
      },
      {
        name: 'registrationDate',
        title: 'Registration Date',
        type: 'datetime',
        initialValue: (new Date()).toISOString()
      },
      {
        name: 'paymentStatus',
        title: 'Payment Status',
        type: 'string',
        options: {
          list: [
            { title: 'Pending', value: 'pending' },
            { title: 'Completed', value: 'completed' },
            { title: 'Failed', value: 'failed' }
          ]
        },
        initialValue: 'pending'
      },
      {
        name: 'paymentId',
        title: 'Payment ID',
        type: 'string'
      }
    ]
  }