// example: /api/programs.js
// This endpoint can return programs data from a database
// It will be available at: https://yoursite.com/api/programs

export default async (req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method === 'GET') {
    try {
      // TODO: Fetch from database or static data
      const programs = [
        {
          id: 1,
          title: 'Special Care Sanctuary',
          description: 'Nurturing daycare environment tailored for the unique developmental paths of intellectually disabled children.',
          icon: 'Sun'
        },
        {
          id: 2,
          title: 'Residential Living',
          description: 'Architecturally designed separate hostels for boys and girls, providing a safe and dignified 24/7 home.',
          icon: 'Home'
        },
        {
          id: 3,
          title: 'Rehabilitation Journey',
          description: 'Expert physiotherapy, speech therapy, and psychological counseling to empower physical and mental wellness.',
          icon: 'Activity'
        },
        {
          id: 4,
          title: 'Medical Assistance',
          description: 'Direct access to specialized medical support and regular health monitoring for our residents.',
          icon: 'Stethoscope'
        },
        {
          id: 5,
          title: 'Adaptive Education',
          description: 'Tailored learning programs that recognize diverse learning styles and celebrate every milestone.',
          icon: 'BookOpen'
        },
        {
          id: 6,
          title: 'Economic Empowerment',
          description: 'Vocational training and workshops designed to equip adults with skills for independent living.',
          icon: 'Users'
        }
      ];

      return res.status(200).json({ 
        success: true, 
        data: programs 
      });
    } catch (error) {
      console.error('Programs fetch error:', error);
      return res.status(500).json({ 
        success: false, 
        error: 'Failed to fetch programs' 
      });
    }
  }

  res.status(405).json({ error: 'Method not allowed' });
};
