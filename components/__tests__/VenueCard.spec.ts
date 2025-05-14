import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import VenueCard from '../VenueCard.vue'

describe('VenueCard', () => {
  const mockVenue = {
    id: 1,
    name: 'Test Venue',
    location: 'Test Location',
    distance: 5,
    imageUrl: 'test-image.jpg'
  }

  it('renders venue information correctly', () => {
    const wrapper = mount(VenueCard, {
      props: {
        venue: mockVenue
      }
    })

    // Check if venue name is rendered
    expect(wrapper.find('h2').text()).toBe('Test Venue')
    
    // Check if location is rendered
    expect(wrapper.find('.text-[var(--text-secondary)]').text()).toContain('Test Location')
    
    // Check if distance is rendered
    expect(wrapper.find('.text-[var(--text-secondary)]').text()).toContain('5 км от вас')
  })

  it('navigates to venue detail page when clicked', async () => {
    const wrapper = mount(VenueCard, {
      props: {
        venue: mockVenue
      }
    })

    // Mock router
    const mockRouter = {
      push: vi.fn()
    }
    wrapper.vm.$router = mockRouter

    // Click the card
    await wrapper.trigger('click')

    // Check if router.push was called with correct path
    expect(mockRouter.push).toHaveBeenCalledWith('/venue/1')
  })

  it('renders image with correct attributes', () => {
    const wrapper = mount(VenueCard, {
      props: {
        venue: mockVenue
      }
    })

    const img = wrapper.find('img')
    
    // Check if image has correct src
    expect(img.attributes('src')).toBe('test-image.jpg')
    
    // Check if image has correct alt text
    expect(img.attributes('alt')).toBe('Test Venue')
    
    // Check if image has lazy loading
    expect(img.attributes('loading')).toBe('lazy')
  })
}) 