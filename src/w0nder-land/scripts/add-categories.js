const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const postsDirectory = path.join(process.cwd(), 'public', 'posts');

// 카테고리 매핑 (포스트 번호별)
const categoryMapping = {
  '1': 'TECH',
  '2': 'BUSINESS',
  '3': 'DESIGN',
  '4': 'TECH',
  '5': 'REVIEW',
  '6': 'LIFE',
  '7': 'LIFE',
  '8': 'PLAN',
  '9': 'LIFE',
  '10': 'LIFE',
  '11': 'TECH',
  '12': 'LIFE',
  '13': 'LIFE',
  '14': 'LIFE',
  '15': 'LIFE',
  '16': 'LIFE',
  '17': 'LIFE',
  '18': 'LIFE',
  '19': 'LIFE',
  '20': 'LIFE',
  '21': 'LIFE',
  '22': 'LIFE',
  '23': 'LIFE',
  '24': 'LIFE',
  '25': 'LIFE',
  '26': 'LIFE',
  '27': 'LIFE',
  '28': 'LIFE',
  '29': 'LIFE',
  '30': 'LIFE',
  '31': 'LIFE',
  '32': 'LIFE',
  '33': 'LIFE'
};

function addCategoryToPost(postNumber) {
  const postPath = path.join(postsDirectory, postNumber, 'post.md');

  if (!fs.existsSync(postPath)) {
    console.log(`Post ${postNumber} not found`);
    return;
  }

  const fileContents = fs.readFileSync(postPath, 'utf8');
  const { data, content } = matter(fileContents);

  // 이미 category가 있으면 건너뛰기
  if (data.category) {
    console.log(`Post ${postNumber} already has category: ${data.category}`);
    return;
  }

  const category = categoryMapping[postNumber];
  if (!category) {
    console.log(`No category mapping for post ${postNumber}`);
    return;
  }

  // category 필드 추가
  data.category = category;

  // 새로운 frontmatter 생성
  const newFrontmatter = matter.stringify(content, data);

  // 파일에 쓰기
  fs.writeFileSync(postPath, newFrontmatter);
  console.log(`Added category "${category}" to post ${postNumber}`);
}

// 모든 포스트 처리
const postNumbers = Object.keys(categoryMapping);
postNumbers.forEach(addCategoryToPost);

console.log('Category addition completed!');