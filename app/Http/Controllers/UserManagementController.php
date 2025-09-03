<?php
namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Hash;

class UserManagementController extends Controller
{
    public function index()
    {
        $users = User::select('id', 'name', 'email', 'role')->get();
        return Inertia::render('Super/Users', compact('users'));
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name'     => 'required|string|max:255',
            'email'    => 'required|email|max:255|unique:users,email',
            'role'     => 'required|in:super,busdev,apotek',
            'password' => 'required|string|min:6',
        ]);

        User::create([
            'name'     => $validated['name'],
            'email'    => $validated['email'],
            'role'     => $validated['role'],
            'password' => Hash::make($validated['password']),
        ]);

        return redirect()->route('super.users')->with('success', 'User berhasil ditambahkan.');
    }

    public function update(Request $request, User $user)
{
    $validated = $request->validate([
        'name'  => 'required|string|max:255',
        'email' => 'required|email|max:255|unique:users,email,' . $user->id,
        'role'  => 'required|in:super,busdev,apotek',
        'password' => 'nullable|string|min:6',
    ]);

    $user->name = $validated['name'];
    $user->email = $validated['email'];
    $user->role = $validated['role'];

    if (!empty($validated['password'])) {
        $user->password = Hash::make($validated['password']);
    }

    $user->save();

    return redirect()->route('super.users')->with('success', 'User berhasil diupdate.');
}

public function edit(User $user)
{
    return Inertia::render('Super/UserEdit', [
        'user' => $user
    ]);
}
public function destroy(User $user)
{
    $user->delete();
    return redirect()->route('super.users')->with('success', 'User berhasil dihapus.');
}
}
