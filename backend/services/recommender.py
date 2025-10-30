"""
Skill Recommender Service
Provides learning resources and recommendations for missing skills
"""
from typing import Dict, List
import logging

logger = logging.getLogger(__name__)

class SkillRecommender:
    def __init__(self):
        """Initialize the skill recommender with learning resources"""

        # Learning resource database
        self.learning_resources = {
            # Programming Languages
            'python': {
                'priority': 'High',
                'category': 'Programming Languages',
                'difficulty': 'Beginner to Advanced',
                'time_estimate': '2-4 weeks',
                'resources': [
                    {
                        'name': 'Python.org Official Tutorial',
                        'type': 'Documentation',
                        'url': 'https://docs.python.org/3/tutorial/',
                        'free': True
                    },
                    {
                        'name': 'Automate the Boring Stuff with Python',
                        'type': 'Book/Course',
                        'url': 'https://automatetheboringstuff.com/',
                        'free': True
                    },
                    {
                        'name': 'Python for Everybody (Coursera)',
                        'type': 'Online Course',
                        'url': 'https://www.coursera.org/specializations/python',
                        'free': False
                    }
                ]
            },
            'javascript': {
                'priority': 'High',
                'category': 'Programming Languages',
                'difficulty': 'Beginner to Advanced',
                'time_estimate': '3-5 weeks',
                'resources': [
                    {
                        'name': 'MDN Web Docs - JavaScript',
                        'type': 'Documentation',
                        'url': 'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
                        'free': True
                    },
                    {
                        'name': 'JavaScript.info',
                        'type': 'Interactive Tutorial',
                        'url': 'https://javascript.info/',
                        'free': True
                    },
                    {
                        'name': 'JavaScript Algorithms and Data Structures (freeCodeCamp)',
                        'type': 'Online Course',
                        'url': 'https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/',
                        'free': True
                    }
                ]
            },
            'typescript': {
                'priority': 'High',
                'category': 'Programming Languages',
                'difficulty': 'Intermediate',
                'time_estimate': '2-3 weeks',
                'resources': [
                    {
                        'name': 'TypeScript Handbook',
                        'type': 'Documentation',
                        'url': 'https://www.typescriptlang.org/docs/',
                        'free': True
                    },
                    {
                        'name': 'TypeScript Course (Microsoft Learn)',
                        'type': 'Online Course',
                        'url': 'https://docs.microsoft.com/en-us/learn/paths/build-javascript-applications-typescript/',
                        'free': True
                    }
                ]
            },

            # Web Technologies
            'react': {
                'priority': 'High',
                'category': 'Web Technologies',
                'difficulty': 'Intermediate',
                'time_estimate': '3-4 weeks',
                'resources': [
                    {
                        'name': 'Official React Documentation',
                        'type': 'Documentation',
                        'url': 'https://reactjs.org/docs/getting-started.html',
                        'free': True
                    },
                    {
                        'name': 'React - The Complete Guide (Udemy)',
                        'type': 'Video Course',
                        'url': 'https://www.udemy.com/course/react-the-complete-guide-incl-redux/',
                        'free': False
                    }
                ]
            },
            'node.js': {
                'priority': 'High',
                'category': 'Web Technologies',
                'difficulty': 'Intermediate',
                'time_estimate': '2-3 weeks',
                'resources': [
                    {
                        'name': 'Node.js Official Documentation',
                        'type': 'Documentation',
                        'url': 'https://nodejs.org/en/docs/',
                        'free': True
                    },
                    {
                        'name': 'Node.js Tutorial (W3Schools)',
                        'type': 'Interactive Tutorial',
                        'url': 'https://www.w3schools.com/nodejs/',
                        'free': True
                    }
                ]
            },

            # Cloud Platforms
            'aws': {
                'priority': 'Medium',
                'category': 'Cloud Platforms',
                'difficulty': 'Intermediate to Advanced',
                'time_estimate': '4-6 weeks',
                'resources': [
                    {
                        'name': 'AWS Free Tier',
                        'type': 'Hands-on Practice',
                        'url': 'https://aws.amazon.com/free/',
                        'free': True
                    },
                    {
                        'name': 'AWS Cloud Practitioner Essentials',
                        'type': 'Online Course',
                        'url': 'https://aws.amazon.com/training/digital/aws-cloud-practitioner-essentials/',
                        'free': True
                    },
                    {
                        'name': 'AWS Solutions Architect Course',
                        'type': 'Certification Course',
                        'url': 'https://aws.amazon.com/training/path-architect/',
                        'free': False
                    }
                ]
            },
            'docker': {
                'priority': 'High',
                'category': 'DevOps',
                'difficulty': 'Intermediate',
                'time_estimate': '2-3 weeks',
                'resources': [
                    {
                        'name': 'Docker Official Tutorial',
                        'type': 'Documentation',
                        'url': 'https://docs.docker.com/get-started/',
                        'free': True
                    },
                    {
                        'name': 'Docker for Developers Course',
                        'type': 'Video Course',
                        'url': 'https://www.pluralsight.com/courses/docker-developers',
                        'free': False
                    }
                ]
            },
            'kubernetes': {
                'priority': 'Medium',
                'category': 'DevOps',
                'difficulty': 'Advanced',
                'time_estimate': '4-6 weeks',
                'resources': [
                    {
                        'name': 'Kubernetes Basics',
                        'type': 'Documentation',
                        'url': 'https://kubernetes.io/docs/tutorials/kubernetes-basics/',
                        'free': True
                    },
                    {
                        'name': 'Kubernetes for Developers (CNCF)',
                        'type': 'Online Course',
                        'url': 'https://www.cncf.io/certification/ckad/',
                        'free': False
                    }
                ]
            },

            # Databases
            'postgresql': {
                'priority': 'High',
                'category': 'Databases',
                'difficulty': 'Intermediate',
                'time_estimate': '2-3 weeks',
                'resources': [
                    {
                        'name': 'PostgreSQL Documentation',
                        'type': 'Documentation',
                        'url': 'https://www.postgresql.org/docs/',
                        'free': True
                    },
                    {
                        'name': 'PostgreSQL Tutorial',
                        'type': 'Interactive Tutorial',
                        'url': 'https://www.postgresqltutorial.com/',
                        'free': True
                    }
                ]
            },
            'mongodb': {
                'priority': 'Medium',
                'category': 'Databases',
                'difficulty': 'Intermediate',
                'time_estimate': '2-3 weeks',
                'resources': [
                    {
                        'name': 'MongoDB University',
                        'type': 'Online Course',
                        'url': 'https://university.mongodb.com/',
                        'free': True
                    },
                    {
                        'name': 'MongoDB Manual',
                        'type': 'Documentation',
                        'url': 'https://docs.mongodb.com/manual/',
                        'free': True
                    }
                ]
            },

            # Testing & Development Practices
            'testing': {
                'priority': 'High',
                'category': 'Development Practices',
                'difficulty': 'Intermediate',
                'time_estimate': '2-3 weeks',
                'resources': [
                    {
                        'name': 'Software Testing Fundamentals',
                        'type': 'Online Course',
                        'url': 'https://www.coursera.org/learn/software-testing-fundamentals',
                        'free': False
                    },
                    {
                        'name': 'Jest Testing Framework',
                        'type': 'Documentation',
                        'url': 'https://jestjs.io/docs/getting-started',
                        'free': True
                    }
                ]
            },
            'graphql': {
                'priority': 'Medium',
                'category': 'Web Technologies',
                'difficulty': 'Intermediate',
                'time_estimate': '2-3 weeks',
                'resources': [
                    {
                        'name': 'GraphQL Official Tutorial',
                        'type': 'Documentation',
                        'url': 'https://graphql.org/learn/',
                        'free': True
                    },
                    {
                        'name': 'The Road to GraphQL',
                        'type': 'Book',
                        'url': 'https://www.roadtographql.com/',
                        'free': False
                    }
                ]
            },
            'ci/cd': {
                'priority': 'High',
                'category': 'DevOps',
                'difficulty': 'Intermediate',
                'time_estimate': '2-4 weeks',
                'resources': [
                    {
                        'name': 'GitHub Actions Documentation',
                        'type': 'Documentation',
                        'url': 'https://docs.github.com/en/actions',
                        'free': True
                    },
                    {
                        'name': 'Jenkins Tutorial',
                        'type': 'Online Tutorial',
                        'url': 'https://www.jenkins.io/doc/tutorials/',
                        'free': True
                    }
                ]
            },
            'microservices': {
                'priority': 'Medium',
                'category': 'Architecture',
                'difficulty': 'Advanced',
                'time_estimate': '4-6 weeks',
                'resources': [
                    {
                        'name': 'Microservices Patterns',
                        'type': 'Book',
                        'url': 'https://microservices.io/patterns/',
                        'free': True
                    },
                    {
                        'name': 'Building Microservices (O\'Reilly)',
                        'type': 'Book',
                        'url': 'https://www.oreilly.com/library/view/building-microservices/9781491950340/',
                        'free': False
                    }
                ]
            },
            'leadership': {
                'priority': 'Medium',
                'category': 'Soft Skills',
                'difficulty': 'Intermediate',
                'time_estimate': '4-8 weeks',
                'resources': [
                    {
                        'name': 'Leadership in Technology (LinkedIn Learning)',
                        'type': 'Online Course',
                        'url': 'https://www.linkedin.com/learning/paths/leadership-in-technology',
                        'free': False
                    },
                    {
                        'name': 'Technical Leadership Guide',
                        'type': 'Article/Blog',
                        'url': 'https://www.thoughtworks.com/insights/articles/technical-leadership-guide',
                        'free': True
                    }
                ]
            }
        }

        # Generic learning platforms
        self.generic_platforms = [
            {
                'name': 'Coursera',
                'type': 'MOOC Platform',
                'url': 'https://www.coursera.org/',
                'description': 'University courses and professional certificates'
            },
            {
                'name': 'LinkedIn Learning',
                'type': 'Professional Development',
                'url': 'https://www.linkedin.com/learning/',
                'description': 'Business and technology skills courses'
            },
            {
                'name': 'Pluralsight',
                'type': 'Tech Skills Platform',
                'url': 'https://www.pluralsight.com/',
                'description': 'Technology and creative skills training'
            },
            {
                'name': 'Udemy',
                'type': 'Online Learning',
                'url': 'https://www.udemy.com/',
                'description': 'Wide range of courses on various topics'
            },
            {
                'name': 'freeCodeCamp',
                'type': 'Free Coding Bootcamp',
                'url': 'https://www.freecodecamp.org/',
                'description': 'Free coding curriculum with certifications'
            }
        ]

    def get_skill_recommendation(self, skill: str) -> Dict:
        """Get recommendation for a specific skill"""
        skill_lower = skill.lower().replace('.', '').replace('-', ' ').strip()

        # Direct match
        if skill_lower in self.learning_resources:
            return self.learning_resources[skill_lower]

        # Fuzzy matching for similar skills
        for resource_skill, resource_data in self.learning_resources.items():
            if (skill_lower in resource_skill or 
                resource_skill in skill_lower or
                any(skill_lower in alias for alias in resource_data.get('aliases', []))):
                return resource_data

        # Generic recommendation
        return {
            'priority': 'Medium',
            'category': 'General',
            'difficulty': 'Varies',
            'time_estimate': '2-4 weeks',
            'resources': [
                {
                    'name': f'{skill} courses on Coursera',
                    'type': 'Online Course',
                    'url': f'https://www.coursera.org/search?query={skill.replace(" ", "%20")}',
                    'free': False
                },
                {
                    'name': f'{skill} tutorials on YouTube',
                    'type': 'Video Tutorial',
                    'url': f'https://www.youtube.com/results?search_query={skill.replace(" ", "+")}+tutorial',
                    'free': True
                },
                {
                    'name': f'{skill} documentation/official site',
                    'type': 'Documentation',
                    'url': f'https://www.google.com/search?q={skill.replace(" ", "+")}+official+documentation',
                    'free': True
                }
            ]
        }

    def create_learning_path(self, missing_skills: List[str]) -> List[Dict]:
        """Create a prioritized learning path for multiple skills"""
        learning_path = []

        # Categorize skills by priority and difficulty
        high_priority = []
        medium_priority = []
        low_priority = []

        for skill in missing_skills:
            recommendation = self.get_skill_recommendation(skill)
            skill_info = {
                'skill': skill,
                'recommendation': recommendation
            }

            if recommendation['priority'] == 'High':
                high_priority.append(skill_info)
            elif recommendation['priority'] == 'Medium':
                medium_priority.append(skill_info)
            else:
                low_priority.append(skill_info)

        # Sort by difficulty within each priority group
        difficulty_order = {'Beginner': 1, 'Intermediate': 2, 'Advanced': 3, 'Varies': 2}

        for priority_group in [high_priority, medium_priority, low_priority]:
            priority_group.sort(key=lambda x: difficulty_order.get(x['recommendation']['difficulty'], 2))

        # Combine into final learning path
        learning_path = high_priority + medium_priority + low_priority

        return learning_path

    def get_recommendations(self, missing_skills: List[str]) -> List[Dict]:
        """Main method to get recommendations for missing skills"""
        try:
            if not missing_skills:
                return []

            recommendations = []

            for skill in missing_skills:
                recommendation = self.get_skill_recommendation(skill)

                # Create recommendation object
                rec = {
                    'skill': skill,
                    'priority': recommendation['priority'],
                    'category': recommendation['category'],
                    'difficulty': recommendation['difficulty'],
                    'estimated_time': recommendation['time_estimate'],
                    'resources': recommendation['resources'][:3],  # Limit to top 3 resources
                    'learning_tips': self.get_learning_tips(skill, recommendation)
                }

                recommendations.append(rec)

            return recommendations

        except Exception as e:
            logger.error(f"Error generating recommendations: {str(e)}")
            return []

    def get_learning_tips(self, skill: str, recommendation: Dict) -> List[str]:
        """Generate learning tips for a skill"""
        tips = []

        category = recommendation.get('category', '').lower()
        difficulty = recommendation.get('difficulty', '').lower()

        # Category-specific tips
        if 'programming' in category:
            tips.extend([
                "Start with small projects to practice",
                "Join coding communities and forums",
                "Practice coding challenges daily"
            ])
        elif 'web' in category:
            tips.extend([
                "Build a portfolio project",
                "Stay updated with latest frameworks",
                "Practice responsive design principles"
            ])
        elif 'cloud' in category:
            tips.extend([
                "Use free tier accounts for hands-on practice",
                "Focus on core services first",
                "Consider certification paths"
            ])
        elif 'database' in category:
            tips.extend([
                "Practice with real datasets",
                "Learn query optimization",
                "Understand database design principles"
            ])
        elif 'devops' in category:
            tips.extend([
                "Set up a home lab environment",
                "Learn automation tools",
                "Practice infrastructure as code"
            ])

        # Difficulty-specific tips
        if 'beginner' in difficulty:
            tips.append("Take your time to understand fundamentals")
        elif 'advanced' in difficulty:
            tips.append("Prerequisites knowledge may be required")

        # Generic tips
        tips.extend([
            "Set aside dedicated learning time daily",
            "Find a study buddy or mentor",
            "Apply knowledge immediately in projects"
        ])

        return tips[:5]  # Return top 5 tips
