# Portfolio Components Documentation

This document describes the refactored component structure for the portfolio website.

## Component Structure

### Main Components

#### 1. **LoadingScreen.tsx**
- **Purpose**: Displays animated loading screen with multilingual greetings
- **Props**:
  - `isLoaded: boolean` - Controls loading state
  - `onLoadComplete: () => void` - Callback when loading is complete
- **Features**:
  - Cycles through 14 different language greetings
  - Shows initials "SP." after all greetings
  - Smooth fade-out animation

#### 2. **HeroSection.tsx**
- **Purpose**: Main hero section with introduction and profile image
- **Props**:
  - `isLoaded: boolean` - Controls animation state
  - `isPlaying: boolean` - Audio player state
  - `setIsPlaying: (playing: boolean) => void` - Toggle audio
  - `scrollToSection: (sectionId: string) => void` - Navigation function
  - `sectionRef: RefObject<HTMLDivElement | null>` - Section reference
- **Features**:
  - Profile image with decorative frames
  - Play/pause button for audio
  - Smooth animations with staggered delays
  - Scroll indicator

#### 3. **AboutSection.tsx**
- **Purpose**: About me section with philosophy and values
- **Props**:
  - `isVisible: boolean` - Controls section visibility animations
  - `sectionRef: RefObject<HTMLDivElement | null>` - Section reference
- **Features**:
  - Three feature cards (Development Philosophy, Collaborative, Innovation)
  - Staggered animations for each card
  - Icon integration with Lucide React

#### 4. **SkillsSection.tsx**
- **Purpose**: Technical skills and expertise showcase
- **Props**:
  - `isVisible: boolean` - Controls section visibility animations
  - `sectionRef: RefObject<HTMLDivElement | null>` - Section reference
- **Features**:
  - Categorized skill groups (Programming Languages, Frameworks, Tools)
  - Animated skill list with bullet points
  - Responsive grid layout

#### 5. **ExperienceSection.tsx**
- **Purpose**: Professional experience timeline
- **Props**:
  - `isVisible: boolean` - Controls section visibility animations
  - `sectionRef: RefObject<HTMLDivElement | null>` - Section reference
- **Features**:
  - Timeline layout with dates and descriptions
  - Detailed experience descriptions
  - Staggered animations for each experience item

#### 6. **WorkSection.tsx**
- **Purpose**: Portfolio projects from GitHub API
- **Props**:
  - `isVisible: boolean` - Controls section visibility animations
  - `sectionRef: RefObject<HTMLDivElement | null>` - Section reference
  - `repos: GitHubRepo[]` - Repository data
  - `reposLoading: boolean` - Loading state
  - `reposError: string | null` - Error handling
- **Features**:
  - Dynamic project cards from GitHub API
  - Loading and error states
  - Project metadata (stars, forks, language, topics)
  - Link to full GitHub profile

#### 7. **ProjectCard.tsx**
- **Purpose**: Individual project card component
- **Props**:
  - `repo: GitHubRepo` - Repository data
  - `index: number` - Card index for staggered animations
  - `isVisible: boolean` - Controls card visibility animations
- **Features**:
  - Hover effects and animations
  - GitHub stats display
  - Technology tags
  - External links

#### 8. **EducationSection.tsx**
- **Purpose**: Educational background information
- **Props**:
  - `isVisible: boolean` - Controls section visibility animations
  - `sectionRef: RefObject<HTMLDivElement | null>` - Section reference
- **Features**:
  - Clean, centered layout
  - University and graduation information
  - Award icon integration

#### 9. **ContactSection.tsx**
- **Purpose**: Contact information and resume download
- **Props**:
  - `isVisible: boolean` - Controls section visibility animations
  - `sectionRef: RefObject<HTMLDivElement | null>` - Section reference
- **Features**:
  - Multiple contact methods (Email, Telegram, LinkedIn)
  - Resume download functionality
  - Quick contact buttons
  - Call-to-action section

### Utility Components

#### 10. **SectionHeader.tsx**
- **Purpose**: Reusable section header component
- **Props**:
  - `subtitle: string` - Section subtitle
  - `title: string` - Main title
  - `highlightedWord: string` - Word to highlight in yellow
  - `description?: string` - Optional description
  - `isVisible: boolean` - Controls visibility animations
  - `className?: string` - Additional CSS classes
- **Features**:
  - Consistent styling across sections
  - Animated text reveals
  - Highlighted keywords

#### 11. **ScrollIndicator.tsx**
- **Purpose**: Animated scroll indicator
- **Props**:
  - `isLoaded: boolean` - Controls visibility
  - `scrollToSection: (sectionId: string) => void` - Navigation function
- **Features**:
  - Bouncing arrow animation
  - Smooth scroll to next section

#### 12. **SocialLinks.tsx**
- **Purpose**: Fixed social media links sidebar
- **Props**:
  - `isLoaded: boolean` - Controls visibility and animations
- **Features**:
  - Fixed positioning
  - Hover effects
  - Links to GitHub, LinkedIn, and Email

#### 13. **Footer.tsx**
- **Purpose**: Simple footer with copyright information
- **Features**:
  - Minimalist design
  - Copyright notice

## Key Improvements

### 1. **Modularity**
- Each section is now a separate component
- Easy to maintain and update individual sections
- Reusable components (SectionHeader, ProjectCard)

### 2. **Type Safety**
- Proper TypeScript interfaces for all props
- Consistent prop naming conventions
- Better IDE support and error catching

### 3. **Performance**
- Reduced bundle size through code splitting
- Optimized re-renders with proper prop passing
- Efficient component structure

### 4. **Maintainability**
- Clear component boundaries
- Consistent file naming convention
- Separation of concerns

### 5. **Reusability**
- SectionHeader component used across multiple sections
- ProjectCard component for consistent project display
- Utility components for common functionality

## Usage

```typescript
import HeroSection from "./components/HeroSection"
import AboutSection from "./components/AboutSection"
// ... other imports

export default function HomePage() {
  // ... state and logic
  
  return (
    <div>
      <HeroSection
        isLoaded={isLoaded}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        scrollToSection={scrollToSection}
        sectionRef={sectionRefs.hero}
      />
      <AboutSection
        isVisible={visibleSections.has("about")}
        sectionRef={sectionRefs.about}
      />
      {/* ... other sections */}
    </div>
  )
}
```

## File Structure

```
src/app/components/
├── LoadingScreen.tsx
├── HeroSection.tsx
├── AboutSection.tsx
├── SkillsSection.tsx
├── ExperienceSection.tsx
├── WorkSection.tsx
├── ProjectCard.tsx
├── EducationSection.tsx
├── ContactSection.tsx
├── SectionHeader.tsx
├── ScrollIndicator.tsx
├── SocialLinks.tsx
├── Footer.tsx
└── navbar.tsx (existing)
```

## Benefits of This Architecture

1. **Easier Testing**: Each component can be tested independently
2. **Better Collaboration**: Different team members can work on different components
3. **Scalability**: Easy to add new sections or modify existing ones
4. **Consistency**: Shared components ensure consistent styling and behavior
5. **Performance**: Better tree-shaking and code splitting opportunities
