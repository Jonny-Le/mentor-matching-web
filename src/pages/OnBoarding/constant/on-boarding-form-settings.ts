import { IOnBoardingFormSetting, EDisplayControlType } from '@src/pages/OnBoarding/models/on-boarding.model';

const fieldOfStudiesOptions = [
  {
    label: 'Humanities',
    value: 'humanities',
  },
  {
    label: 'Social Sciences',
    value: 'social_sciences',
  },
  {
    label: 'Natural Sciences',
    value: 'natural_sciences',
  },
  {
    label: 'Mathematics and Statistics',
    value: 'mathematics_and_statistics',
  },
  {
    label: 'Engineering',
    value: 'engineering',
  },
  {
    label: 'Computer Science and Information Technology',
    value: 'cs_it',
  },
  {
    label: 'Business and Management',
    value: 'business_management',
  },
  {
    label: 'Health Sciences',
    value: 'health_sciences',
  },
  {
    label: 'Education',
    value: 'education',
  },
  {
    label: 'Fine Arts',
    value: 'fine_arts',
  },
  {
    label: 'Communication and Media',
    value: 'communication_media',
  },
  {
    label: 'Agriculture and Environmental Studies',
    value: 'agriculture_environmental',
  },
  {
    label: 'Language and Linguistics',
    value: 'language_linguistics',
  },
  {
    label: 'Health and Wellness',
    value: 'health_wellness',
  },
  {
    label: 'Public Administration and Policy',
    value: 'public_administration_policy',
  },
  {
    label: 'Law and Legal Studies',
    value: 'law_legal_studies',
  },
  {
    label: 'Architecture and Interior Design',
    value: 'architecture_interior_design',
  },
  {
    label: 'Interdisciplinary Studies',
    value: 'interdisciplinary_studies',
  },
];

export const onBoardingFormSettings: IOnBoardingFormSetting[] = [
  {
    id: 'personal-information',
    title: 'Personal Information',
    controls: [
      {
        name: 'fullName',
        display: EDisplayControlType.Input,
        label: 'Full Name',
        disabled: true,
      },
      {
        name: 'sgcId',
        display: EDisplayControlType.Input,
        label: 'Saigonchildren ID',
        disabled: true,
      },
      {
        name: 'phoneNumber',
        display: EDisplayControlType.Input,
        label: 'Phone Number',
        disabled: true,
        inputType: 'tel',
      },
      {
        name: 'email',
        display: EDisplayControlType.Input,
        label: 'Email',
        disabled: true,
        inputType: 'email',
      },
      {
        name: 'address',
        display: EDisplayControlType.Input,
        label: 'Current Address',
        disabled: true,
      },
      {
        name: 'gender',
        display: EDisplayControlType.Radio,
        label: 'Gender',
        options: [
          {
            label: 'Male',
            value: 'male',
          },
          {
            label: 'Female',
            value: 'female',
          },
          {
            label: 'Other',
            value: 'other',
          },
        ],
        rules: {
          required: true,
        },
      },
      {
        name: 'hometown',
        display: EDisplayControlType.SearchSelect,
        label: 'Hometown',
        options: [
          {
            label: 'Ho Chi Minh',
            value: 'hcm',
          },
          {
            label: 'Ha Noi',
            value: 'hn',
          },
          {
            label: 'Da Nang',
            value: 'dn',
          },
        ],
        rules: {
          required: true,
        },
      },
    ],
  },
  {
    id: 'matching-question',
    title: 'Matching Question',
    controls: [
      {
        name: 'academicYear',
        display: EDisplayControlType.Select,
        label: 'Academic Year',
        options: [
          {
            label: '1st Year',
            value: '1',
          },
          {
            label: '2nd Year',
            value: '2',
          },
          {
            label: '3rd Year',
            value: '3',
          },
          {
            label: '4th Year',
            value: '4',
          },
          {
            label: 'Final Thesis',
            value: '5',
          },
        ],
        rules: {
          required: true,
        },
      },
      {
        name: 'fieldOfStudy',
        display: EDisplayControlType.Select,
        label: 'Field of Study',
        options: fieldOfStudiesOptions,
        rules: {
          required: true,
        },
      },
      {
        name: 'fieldOfMentor',
        display: EDisplayControlType.SearchMultiSelect,
        label: 'Which fields you want to mentor?',
        options: fieldOfStudiesOptions,
        inputType: 'multiChoice',
        rules: {
          required: true,
        },
      },
      {
        name: 'fieldOfMentorCheckbox',
        display: EDisplayControlType.Checkbox,
        label: 'Which fields you want to mentor?',
        options: fieldOfStudiesOptions,
        inputType: 'multiChoice',
        rules: {
          required: true,
        },
      },
    ],
  },
  {
    id: 'job-information',
    title: 'Job Status',
    controls: [
      {
        name: 'jobStatus',
        display: EDisplayControlType.Radio,
        label: 'Do you currently have a job?',
        options: [
          {
            label: 'Unemployed',
            value: 'unemployed',
          },
          {
            label: 'Part-time',
            value: 'part_time',
          },
          {
            label: 'Full-time',
            value: 'full_time',
          },
        ],
        rules: {
          required: true,
        },
      },
      {
        name: 'company',
        display: EDisplayControlType.Input,
        label: 'Company',
        rules: {
          required: true,
        },
        dependencies: [
          {
            name: 'jobStatus',
            disableWhen: 'unemployed',
          },
        ],
      },
      {
        name: 'position',
        display: EDisplayControlType.Input,
        label: 'Position',
        rules: {
          required: true,
        },
        dependencies: [
          {
            name: 'jobStatus',
            disableWhen: 'unemployed',
          },
        ],
      },
      {
        name: 'workExperience',
        display: EDisplayControlType.Select,
        label: 'Work Experience',
        options: [
          {
            label: 'No experience',
            value: '0',
          },
          {
            label: '1 year',
            value: '1',
          },
          {
            label: '2 years',
            value: '2',
          },
          {
            label: '3 years',
            value: '3',
          },
          {
            label: '4 years',
            value: '4',
          },
          {
            label: '5 years',
            value: '5',
          },
          {
            label: 'More than 5 years',
            value: '6',
          },
        ],
        rules: {
          required: true,
        },
        dependencies: [
          {
            name: 'jobStatus',
            disableWhen: 'unemployed',
          },
        ],
      },
    ],
  },
];
