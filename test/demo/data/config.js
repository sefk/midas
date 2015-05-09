module.exports = {
  url: 'http://localhost:1337/api',
  users: {
    'tammy': {
      name: 'Tammy Craig',
      username: 'kids@test.gov',
      password: 'kidskidsT1!',
      title: 'Social Media Director',
      agency: 'Dept of Education',
      location: 'Washington, DC',
      photo: 'assets/users/tammy.jpg'
    },
    'pran': {
      name: 'Pran Mhasalkar',
      username: 'pran@test.gov',
      password: 'pranpranT1!',
      title: 'Special Advisor',
      agency: 'OSTP',
      location: 'Washington, DC',
      photo: 'assets/users/pran.jpg'
    },
    'alan': {
      name: 'Alan Barret',
      username: 'alan@test.gov',
      password: 'alanalanT1!',
      title: 'Deputy Secretary',
      agency: 'USDA',
      location: 'Washington, DC',
      photo: 'assets/users/alan.jpg'
    },
    'ned': {
      name: 'Eddard Stark',
      username: 'ned@gameofthrones.com',
      password: 'nednedN1!',
      title: 'Lord of Winterfell and Warden of the North',
      agency: 'GSA',
      location: 'Minneapolis, Minnesota',
      photo: 'assets/users/ned.jpg'
    },
    'tyrion': {
      name: 'Tyrion Lanister',
      username: 'tyrion@gameofthrones.com',
      password: 'tyriontyrionL1!',
      title: 'Master of Coin adn the Imp',
      agency: 'Dept of Treasury',
      location: 'Washington, DC',
      photo: 'assets/users/tyrion.jpg'
    },
    'cersei': {
      name: 'Cersei Lanister',
      username: 'cersei@gameofthrones.com',
      password: 'cerseicerseiL1!',
      title: 'Queen of the Seven Kingdoms',
      agency: 'House of the King',
      location: 'Washington, DC',
      photo: 'assets/users/cersei.jpg'
    },
    'jaime': {
      name: 'Jaime Lannister',
      username: 'jaime@gameofthrones.com',
      password: 'jaimejaimeL1!',
      title: 'Master of the Kings Guard and the Kingslayer',
      agency: 'Dept of Homeland Security',
      location: 'Washington, DC',
      photo: 'assets/users/jaime.jpg'
    },
    'jon': {
      name: 'Jon Snow',
      username: 'jon@gameofthrones.com',
      password: 'jonjonS1!',
      title: 'Member of the Night\'s Watch',
      agency: 'Dept of Homeland Security',
      location: 'Duluth, Minnesota',
      photo: 'assets/users/jon.jpg'
    },
    'oberyn': {
      name: 'Oberyn Martell',
      username: 'oberyn@gameofthrones.com',
      password: 'oberynoberynM1!',
      title: 'Prince of Dorne and the Red Viper',
      agency: 'GSA',
      location: 'São Paulo, BR',
      photo: 'assets/users/oberyn.jpg'
    },
    'balon': {
      name: 'Balon Greyjoy',
      username: 'balon@gameofthrones.com',
      password: 'balonbalonG1!',
      title: 'Lord of the Iron Islands',
      agency: 'Dept of Homeland Security',
      location: 'San Francisco, CA',
      photo: 'assets/users/balon.jpg'
    }

  },
  tags: {
    'Writing': {
      type: 'skill',
      name: 'Writing'
    },
    'Social Media': {
      type: 'skill',
      name: 'Social Media'
    },
    'UX': {
      type: 'skill',
      name: 'UX'
    },
    'Health': {
      type: 'topic',
      name: 'Health'
    },
    'Education': {
      type: 'topic',
      name: 'Education'
    },
    'USDA': {
      type: 'agency',
      name: 'USDA'
    },
    'OSTP': {
      type: 'agency',
      name: 'OSTP'
    },
    'GSA': {
      type: 'agency',
      name: 'GSA'
    },
    'Dept of Homeland Security': {
      type: 'agency',
      name: 'Dept of Homeland Security'
    },
    'Dept of Education': {
      type: 'agency',
      name: 'Dept of Education'
    },
    'Dept of Treasury': {
      type: 'agency',
      name: 'Dept of Treasury'
    },
    'National Parks Service': {
      type: 'agency',
      name: 'National Parks Service'
    },
    'GSA HQ, 1800 F St, Washington, DC': {
      type: 'location',
      name: 'GSA HQ, 1800 F St, Washington, DC'
    },
    'The White House, South Court': {
      type: 'location',
      name: 'The White House, South Court'
    },
    'Washington, DC': {
      type: 'location',
      name: 'Washington, DC',
      data: '{"lat":"38.89511","lon":"-77.03637","source":"geonames","sourceId":4140963,"gmtOffset":-5,"timeZoneId":"America/New_York","dstOffset":-4}'
    },
    'San Francisco, CA': {
      type: 'location',
      name: 'San Francisco, CA',
      data: '{"lat":"37.77493","lon":"-122.41942","source":"geonames","sourceId":5391959,"gmtOffset":-8,"timeZoneId":"America/Los_Angeles","dstOffset":-7}'
    },
    'Minneapolis, Minnesota': {
      type: 'location',
      name: 'Minneapolis, Minnesota',
      data: '{"lat":"44.97997","lon":"-93.26384","source":"geonames","sourceId":5037649,"dstOffset":-5,"gmtOffset":-6,"timeZoneId":"America/Chicago"}'
    },
    'Duluth, Minnesota': {
      type: 'location',
      name: 'Duluth, Minnesota',
      data: '{"lat":"46.78327","lon":"-92.10658","source":"geonames","sourceId":5024719,"dstOffset":-5,"gmtOffset":-6,"timeZoneId":"America/Chicago"}'
    },
    'São Paulo, BR': {
      type: 'location',
      name: 'São Paulo, BR',
      data: '{"lat":"-23.5475","lon":"-46.63611","source":"geonames","sourceId":3448439,"gmtOffset":-2,"timeZoneId":"America/Sao_Paulo","dstOffset":-3}'
    }
  },
  projects: [
    {
      state: 'open',
      title: 'Health and Safety',
      description: 'We are interested in projects that improve the health and safety of the American people.',
      cover: 'assets/projects/roberts_rebellion.png',
      owner: 'alan',
      tags: ['Writing', 'Social Media'],
      comments: [],
      events: [],
      tasks: [{
        state: 'open',
        title: 'Validate USDA Data',
        description: 'Some addresses in the USDA Meat & Poultry Inspection Directory need validating and correcting to ensure they can be leveraged for geospatial mapping. You will determine if the address is suitable for mapping or mailing. Get a quick intro to geo-spatial analysis and help make food inspection more efficient.'
      }
      ]
    },
    {
      state: 'open',
      title: 'Education Resources',
      description: 'We are focused on improving access to education resources for K-12 through use of digital tools, online access and social media.',
      cover: 'assets/projects/roberts_rebellion.png',
      owner: 'tammy',
      tags: ['Writing', 'Social Media'],
      comments: [
        {
          topic: true,
          user: 'alan',
          value: 'Swift as a deer. Quiet as a shadow. Fear cuts deeper than swords. Quick as a snake. Calm as still water.',
          children: [
            {
              user: 'ned',
              value: 'Winter is coming.'
            }
          ]
        },
        {
          topic: true,
          user: 'ned',
          value: 'The man who passes the sentence should swing the sword. ',
          children: [
            {
              user: 'ned',
              value: 'He\'s just stupid. He likes to polish helmets and beat on swords with hammers.'
            },
            {
              user: 'tammy',
              value: 'I much like my head. I don\'t want to see it removed just yet.'
            },
            {
              user: 'pran',
              value: 'I don\'t like your head. And stop your family from trying to kill me.'
            }
          ]
        }
      ],
      events: [
        {
          title: 'Open Testing Evening',
          description: 'Bring all your devices and a laptp if you have one. During this live testing session, you will get the chance to meet other folks in the who are helping make this happen.',
          location: 'GSA HQ, 1800 F St, Washington, DC'
        },
        {
          title: 'Awards Ceremony',
          description: 'Please join us in honoring the project leaders who have made this program so successful.',
          location: 'The White House, South Court'
        }
      ],
      tasks: [
        {
          state: 'open',
          title: 'Who to follow on Twitter? Kids.gov wants to know!',
          description: 'Kids.gov, the official web portal for kids, is putting together a list of influencers that the site should be following and interacting with on Twitter.'
        },
        {
          state: 'open',
          title: 'Is Challenge.gov ready to launch?',
          description: 'You’ll be the critical eye revieing federal challenge and prize competitions, checking links and making sure everything works. It would be helpful to have people who are not familiar with challenge and prize program to help. This is a simple way to gain experience with web software release practives or a great way to learn about this innovative program.'
        }
      ]
    }
  ]
};
