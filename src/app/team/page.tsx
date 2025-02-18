'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Linkedin, Github, Mail } from 'lucide-react';

// Takım üyeleri verisi
const teamMembers = [
  {
    id: 1,
    name: 'Gökhan Özdemir',
    role: 'Project Manager',
    image: '/images/team/gokhan-ozdemir.jpg', // LinkedIn profil fotoğrafı
    linkedin: 'https://www.linkedin.com/in/gokhanozdemir/',
    email: 'gokhan@giyimsepeti.com'
  },
  {
    id: 2,
    name: 'Tuna Gökçe',
    role: 'Full Stack Developer',
    image: '/images/team/tuna-gokce.jpg', // Kendi fotoğrafınız
    linkedin: 'https://www.linkedin.com/in/tunagokce/',
    github: 'https://github.com/tunagokce',
    email: 'tuna@giyimsepeti.com'
  },
  // Diğer takım üyeleri...
];

export default function TeamPage() {
  return (
    <div className="flex flex-col pt-20">
      {/* Page Header */}
      <div className="bg-gray-100 py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-bold text-gray-900">Ekibimiz</h1>
          <p className="mt-2 text-gray-600">
            Giyimsepeti'ni oluşturan harika ekiple tanışın
          </p>
        </div>
      </div>

      {/* Team Grid */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member) => (
            <div 
              key={member.id}
              className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              {/* Member Image */}
              <div className="relative w-48 h-48 rounded-full overflow-hidden mb-6">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Member Info */}
              <h3 className="text-xl font-semibold text-gray-900">{member.name}</h3>
              <p className="text-gray-600 mt-1 mb-4">{member.role}</p>

              {/* Social Links */}
              <div className="flex space-x-4">
                {member.linkedin && (
                  <Link 
                    href={member.linkedin}
                    target="_blank"
                    className="text-gray-600 hover:text-[#0077B5] transition-colors"
                  >
                    <Linkedin className="w-5 h-5" />
                  </Link>
                )}
                {member.github && (
                  <Link 
                    href={member.github}
                    target="_blank"
                    className="text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    <Github className="w-5 h-5" />
                  </Link>
                )}
                {member.email && (
                  <Link 
                    href={`mailto:${member.email}`}
                    className="text-gray-600 hover:text-[#23A6F0] transition-colors"
                  >
                    <Mail className="w-5 h-5" />
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 