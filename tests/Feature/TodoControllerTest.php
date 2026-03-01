<?php

namespace Tests\Feature;

use App\Models\Todo;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class TodoControllerTest extends TestCase
{
    use RefreshDatabase;

    public function test_user_can_list_only_their_own_todos(): void
    {
        $user = User::factory()->create();
        Todo::factory()->count(5)->create(['user_id' => $user->id]);
        Todo::factory()->count(2)->create();

        $response = $this->actingAs($user)->getJson('/api/todos');

        $response->assertStatus(200)
            ->assertJsonCount(5, 'data')
            ->assertJsonStructure([
                'data' => [
                    '*' => ['id', 'title', 'completed', 'user_id', 'created_at'],
                ],
                'links',
            ]);
    }

    public function test_user_can_create_a_todo(): void
    {
        $user = User::factory()->create();
        $payload = ['title' => 'Tarefa de Teste'];

        $response = $this->actingAs($user)->postJson('/api/todos', $payload);

        $response->assertStatus(201)
            ->assertJsonPath('title', 'Tarefa de Teste')
            ->assertJsonPath('user_id', $user->id);

        $this->assertDatabaseHas('todos', [
            'title' => 'Tarefa de Teste',
            'user_id' => $user->id,
        ]);
    }

    public function test_title_is_required_to_create_todo(): void
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)->postJson('/api/todos', ['title' => '']);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['title']);
    }

    public function test_title_cannot_exceed_120_characters(): void
    {
        $user = User::factory()->create();
        $longTitle = str_repeat('a', 121);

        $response = $this->actingAs($user)->postJson('/api/todos', ['title' => $longTitle]);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['title']);
    }
}
